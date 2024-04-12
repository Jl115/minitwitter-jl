import { Request, Response } from "express";
import Comment from "./comment.model";
import Post from "../post/post.model";
import User from "../user/user.model";


export default class LikeController {
  async getAllComments (req: Request, res: Response) {
    try {
      const postId: number = parseInt(req.body.id);
      const comments = await Comment.findAll({ where: { postId } });
      res.status(200).send(comments);
    } catch (err) {
      console.error('\x1b[33m%s\x1b[0m', 'Error in getAllComments method:', err);
      res.status(500).send({
        message: "Some error occurred while retrieving comments."
      });
    }
  }

  async createComment (req: Request, res: Response) {
    if (!req.body.userId || !req.body.postId || !req.body.text) {
      res.status(400).send({
        message: "userId, postId, or text cannot be empty!"
      });
      return;
    }

    try {
      const { userId, postId, text } = req.body;
      const savedComment = await Comment.create({
        userId: userId,
        postId: postId,
        text: text
      });
      res.status(201).send(savedComment);
    } catch (err) {
      console.error('\x1b[33m%s\x1b[0m', 'err in CommentController createComment --------------------', err);
      res.status(500).send({
        message: "Some error occurred while creating comment."
      });
    }
  }

  async findAllCommentPostById (req: Request, res: Response) {
    try {
      const userId: number = parseInt(req.body.userId);
      const comments = await Comment.findAll({
        where: { userId },
        include: [{ model: Post }, { model: User }]
      });
      res.status(200).send(comments);
    } catch (err) {
      console.error('\x1b[33m%s\x1b[0m', 'error in CommentController findAllCommentPostById --------------------', err);
      res.status(500).send({
        message: "Some error occurred while retrieving comments."
      });
    }
  }
  async updateComment (req: Request, res: Response) {
    const id: number = parseInt(req.body.id);
    const { text } = req.body;

    try {
      const comment = await Comment.findByPk(id);
      if (!comment) {
        res.status(404).send({
          message: `Cannot find Comment with id=${id}.`
        });
        return;
      }

      comment.text = text;
      await comment.save();

      res.status(200).send(comment);
    } catch (err) {
      console.error('\x1b[33m%s\x1b[0m', 'Error in updateComment method:', err);
      res.status(500).send({
        message: `Error updating Comment with id=${id}.`
      });
    }
  }


  async deleteComment (req: Request, res: Response) {
    const id: number = parseInt(req.body.id);

    try {
      const num = await Comment.destroy({ where: { id } });

      if (num === 1) {
        res.send({
          message: "Comment was deleted successfully."
        });
      } else {
        res.send({
          message: `Cannot delete Comment with id=${id}. Maybe Comment was not found!`
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Error deleting Comment with id=${id}.`
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
