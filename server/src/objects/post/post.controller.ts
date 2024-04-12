import { Request, Response } from "express";
import Post from "./post.model";
import User from "../user/user.model";
import Like from "../like/like.model";
import Comment from "../comment/comment.model";


export default class PostController {
  async getPost (req: Request, res: Response) {
    try {
      const postId: number = parseInt(req.body.id);
      const post = await Post.findByPk(postId);
      if (post) {
        res.status(200).send({
          message: "Post found",
          post: post
        });
      } else {
        res.status(404).send({
          message: "Post not found"
        });
      }
    } catch (err) {
      console.error('\x1b[33m%s\x1b[0m', 'Error in getPost method:', err);
      res.status(500).send({
        message: "Some error occurred while retrieving post."
      });
    }
  }



  async createPost (req: Request, res: Response) {
    if (!req.body.title || !req.body.content || !req.body.userId) {
      res.status(400).send({
        message: "title, content, or userId cannot be empty!"
      });
      return;
    }

    try {
      const { title, content, userId } = req.body;
      const savedPost = await Post.create({
        title: title,
        content: content,
        userId: userId,
      });


      const initialLike = await Like.create({
        userId: userId,
        postId: savedPost.id,
      });

      res.status(201).send({
        post: savedPost,
        like: initialLike,
      });
    } catch (err) {
      console.error('\x1b[33m%s\x1b[0m', 'err in PostController createPost --------------------', err);
      res.status(500).send({
        message: "Some error occurred while creating post."
      });
    }
  }


  async findAllPosts (req: Request, res: Response) {
    try {
      const allPosts = await Post.findAll({
        include: [
          { model: User },
          { model: Like },
          { model: Comment }
        ]
      });
      console.log('\x1b[33m%s\x1b[0m', 'allPosts --------------------', allPosts);
      res.status(200).send(allPosts);
    } catch (err) {
      console.error('\x1b[33m%s\x1b[0m', 'error in PostController findAllPosts  --------------------', err);
      res.status(500).send({
        message: "Some error occurred while retrieving posts."
      });
    }
  }

  async updatePost (req: Request, res: Response) {
    const postId: number = parseInt(req.body.id);
    console.log('\x1b[33m%s\x1b[0m', 'postId --------------------', postId);
    if (!req.body.title || !req.body.content) {
      res.status(400).send({
        message: "title or content cannot be empty!"
      });
      return;
    }
    try {
      const { title, content, postId, userId } = req.body;
      console.log('\x1b[33m%s\x1b[0m', 'req.body --------------------', req.body);
      const findPost = await Post.findOne({ where: [{ id: postId }, { userId: userId }] });
      console.log('\x1b[33m%s\x1b[0m', 'findPost --------------------', findPost);
      if (!findPost) {
        res.status(404).send({
          message: "Post not found"
        });
        return;
      }
      const updatedPost = await Post.update(
        { title, content },
        { where: [{ id: postId }, { userId: userId }] }
      );
      if (updatedPost[0] === 1) {
        res.status(200).send({
          message: "Post updated successfully."
        });
      } else {
        res.status(404).send({
          message: `Cannot update Post with id=${postId}. Maybe Post was not found!`
        });
      }
    } catch (err) {
      console.error('\x1b[33m%s\x1b[0m', 'Error in updatePost method:', err);
      res.status(500).send({
        message: `Error updating Post with id=${postId}.`
      });
    }
  }

  async deletePost (req: Request, res: Response) {
    const id: number = parseInt(req.params.postId);

    try {
      const num = await Post.destroy({ where: { id } });

      if (num === 1) {
        res.send({
          message: "Post was deleted successfully."
        });
      } else {
        res.send({
          message: `Cannot delete Post with id=${id}. Maybe Post was not found!`
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Error deleting Post with id=${id}.`
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
