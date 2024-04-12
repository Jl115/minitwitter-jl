import { Request, Response } from "express";
import Role from "./role.model";
import User from "../user/user.model";


export default class RoleController {
  async getRoleByUser (req: Request, res: Response) {
    try {
      const userRoleId: number = parseInt(req.body.id);
      const userRole = await Role.findByPk(userRoleId);
      if (userRole) {
        res.status(200).send({
          message: "User has Role ",
          userRole: userRole
        });
      } else {
        res.status(404).send({
          message: "userRole not found"
        });
      }
    } catch (err) {
      console.error('\x1b[33m%s\x1b[0m', 'Error in getRoleByUser method:', err);
      res.status(500).send({
        message: "Some error occurred while retrieving post."
      });
    }
  }

  async promoteUserRole (req: Request, res: Response) {
    if (!req.body.userId || !req.body.roleId) {
      res.status(400).send({
        message: "userId or roleId cannot be empty!"
      });
      return;
    }

    try {
      const { userId, roleId } = req.body;
      const user = await User.findByPk(userId);
      if (!user) {
        res.status(404).send({
          message: "User not found"
        });
        return;
      }

      const role = await Role.findByPk(roleId);
      if (!role) {
        res.status(404).send({
          message: "Role not found"
        });
        return;
      }

      user.roleId = roleId;
      await user.save();

      res.status(200).send({
        message: "User role updated successfully",
        user: user
      });
    } catch (err) {
      console.error('\x1b[33m%s\x1b[0m', 'Error in promoteUserRole method:', err);
      res.status(500).send({
        message: "Some error occurred while promoting user role."
      });
    }
  }

  async findAllUsersByRoleId (req: Request, res: Response) {
    try {
      const roleId: number = parseInt(req.body.roleId);
      const role = await Role.findByPk(roleId, { include: User });
      if (role) {
        res.status(200).send(role.Users);
      } else {
        res.status(404).send({
          message: "Role not found"
        });
      }
    } catch (err) {
      console.error('\x1b[33m%s\x1b[0m', 'Error in findAllUsersByRoleId method:', err);
      res.status(500).send({
        message: "Some error occurred while retrieving users by role."
      });
    }
  }


  /*
    async findOne (req: Request, res: Response) {
      const id: number = parseInt(req.body.id);
  
      try {
        const tutorial = await tutorialRepository.retrieveById(id);
  
        if (tutorial) res.status(200).send(tutorial);
        else
          res.status(404).send({
            message: `Cannot find Tutorial with id=${id}.`
          });
      } catch (err) {
        res.status(500).send({
          message: `Error retrieving Tutorial with id=${id}.`
        });
      }
    }
  
    async update (req: Request, res: Response) {
      let tutorial: Tutorial = req.body;
      tutorial.id = parseInt(req.body.id);
  
      try {
        const num = await tutorialRepository.update(tutorial);
  
        if (num == 1) {
          res.send({
            message: "Tutorial was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Tutorial with id=${tutorial.id}. Maybe Tutorial was not found or req.body is empty!`
          });
        }
      } catch (err) {
        res.status(500).send({
          message: `Error updating Tutorial with id=${tutorial.id}.`
        });
      }
    }
  
    
  
    async deleteAll (req: Request, res: Response) {
      try {
        const num = await tutorialRepository.deleteAll();
  
        res.send({ message: `${num} Tutorials were deleted successfully!` });
      } catch (err) {
        res.status(500).send({
          message: "Some error occurred while removing all tutorials."
        });
      }
    }
  
    async findAllPublished (req: Request, res: Response) {
      try {
        const tutorials = await tutorialRepository.retrieveAll({ published: true });
  
        res.status(200).send(tutorials);
      } catch (err) {
        res.status(500).send({
          message: "Some error occurred while retrieving tutorials."
        });
      }
    } */
}
