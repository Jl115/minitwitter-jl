import { Request, Response } from "express";
import Like from "./like.model";
import Post from "../post/post.model";
import User from "../user/user.model";


export default class LikeController {
  async getAllLikes (req: Request, res: Response) {
    try {
      const postId: number = parseInt(req.body.id);
      const likes = await Like.findAll({ where: { postId } });
      res.status(200).send(likes);
    } catch (err) {
      console.error('\x1b[33m%s\x1b[0m', 'Error in getAllLikes method:', err);
      res.status(500).send({
        message: "Some error occurred while retrieving likes."
      });
    }
  }

  async createLike (req: Request, res: Response) {
    if (!req.body.userId || !req.body.postId) {
      res.status(400).send({
        message: "userId or postId cannot be empty!"
      });
      return;
    }

    try {
      const { userId, postId } = req.body;
      const savedLike = await Like.create({
        userId: userId,
        postId: postId,
      });
      res.status(201).send(savedLike);
    } catch (err) {
      console.error('\x1b[33m%s\x1b[0m', 'err in LikeController createLike --------------------', err);
      res.status(500).send({
        message: "Some error occurred while creating like."
      });
    }
  }

  async findAllLikedPostsById (req: Request, res: Response) {
    try {
      const userId: number = parseInt(req.body.userId);
      const likedPosts = await Like.findAll({
        where: { userId },
        include: [{ model: Post }, { model: User }]

      });
      res.status(200).send(likedPosts);
    } catch (err) {
      console.error('\x1b[33m%s\x1b[0m', 'error in LikeController findAllLikedPostsById --------------------', err);
      res.status(500).send({
        message: "Some error occurred while retrieving liked posts."
      });
    }
  }

  async updateLike (req: Request, res: Response) {
    const id: number = parseInt(req.body.id);
    const { userId, postId } = req.body;

    try {
      const like = await Like.findOne({
        where: {
          userId: userId,
          postId: postId
        }
      });

      if (!like) {
        res.status(404).send({
          message: `Cannot find Like with id=${id}.`
        });
        return;
      }

      like.userId = userId;
      like.postId = postId;
      const updatedLike = await like.save();

      res.status(200).send(updatedLike);
    } catch (err) {
      console.error('\x1b[33m%s\x1b[0m', 'Error in updateLike method:', err);
      res.status(500).send({
        message: `Error updating Like with id=${id}.`
      });
    }
  }


  async deleteLike (req: Request, res: Response) {
    const { userId, postId } = req.params;
    console.log('\x1b[33m%s\x1b[0m', 'userId --------------------', userId);

    try {
      const num = await Like.destroy({ where: { userId: userId, postId: postId } });

      if (num === 1) {
        res.send({
          message: "Like was deleted successfully."
        });
      } else {
        res.send({
          message: `Cannot delete Like with id=${postId}. Maybe Like was not found!`
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Error deleting Like with id=${postId}.`
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
