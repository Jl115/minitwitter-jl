import { Request, Response } from "express";
import User from "./user.model";


export default class UserController {
  async login (req: Request, res: Response) {
    if (!req.body.username || !req.body.password) {
      res.status(400).send({
        message: "username or password cannot be empty!"
      });
      return;
    }

    try {
      const { username, password } = req.body;
      const user = await User.findOne({
        where: {
          username: username,
          password: password
        }
      });
      if (user) {
        res.status(200).send({
          message: "User found",
          user: user
        });
      } else {
        res.status(404).send({
          message: "User not found"
        });
      }
    } catch (err) {
      console.error('\x1b[33m%s\x1b[0m', 'err in AuthController login --------------------', err);
      res.status(500).send({
        message: "Some error occurred while login."
      });
    }
  }

  async register (req: Request, res: Response) {
    if (!req.body.username || !req.body.password) {
      res.status(400).send({
        message: "username or password cannot be empty!"
      });
      return;
    }

    try {
      const { username, password } = req.body;
      const savedUser = await User.create({
        username: username,
        password: password,
      });
      res.status(200).send(savedUser);
    } catch (err) {
      console.error('\x1b[33m%s\x1b[0m', 'err in AuthController createUser --------------------', err);
      res.status(500).send({
        message: "Some error occurred while creating user."
      });
    }
  }

  async findAllUsers (req: Request, res: Response) {
    try {
      const allUser = await User.findAll();
      res.status(200).send(allUser);
    } catch (err) {
      console.error('\x1b[33m%s\x1b[0m', 'error in AuthController findAllUser  --------------------', err);
      res.status(500).send({
        message: "Some error occurred while retrieving user."
      });
    }
  }

  async updateUser (req: Request, res: Response) {
    const id: number = parseInt(req.body.id);
    const { username, password } = req.body;

    try {
      const user = await User.findOne({ where: { id: id } });

      if (user) {
        user.username = username;
        user.password = password;
        await user.save();

        res.status(200).send({
          message: "User updated successfully",
          user: user
        });
      } else {
        res.status(404).send({
          message: "User not found"
        });
      }
    } catch (err) {
      console.error('\x1b[33m%s\x1b[0m', 'error in UserController updateUser --------------------', err);
      res.status(500).send({
        message: `Could not update User with id=${id}.`
      });
    }
  }

  async delete (req: Request, res: Response) {
    const id: number = parseInt(req.body.id);

    try {
      const destroyedUser = await User.destroy({
        where: { id: id }
      })
      res.status(204).send({
        destroyedUser,
        message: `deleted User successfully with the id: ${id}.`
      });

    } catch (err) {
      console.error('\x1b[33m%s\x1b[0m', 'error in AuthController --------------------', err);
      res.status(500).send({
        message: `Could not delete User with id==${id}.`
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
