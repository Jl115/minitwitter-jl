import { Router } from "express";
import CommentController from "./comment.controller";
import BaseRoutes from "../../base/base.routes";

class CommentRoutes extends BaseRoutes {
  private controller: CommentController;

  constructor() {
    super();
    this.controller = new CommentController();
    this.initializeRoutes();
  }

  initializeRoutes () {
    this.router.post("/create", this.controller.createComment.bind(this.controller));
    this.router.get("/postlikes", this.controller.getAllComments.bind(this.controller));
    this.router.get("/findalllikedposts", this.controller.findAllCommentPostById.bind(this.controller));
    this.router.delete("/delete", this.controller.deleteComment.bind(this.controller));
    this.router.put("/update", this.controller.updateComment.bind(this.controller));
  }
}

export default new CommentRoutes().router;
