import { Application } from "express";


import userRoutes from "../objects/user/user.routes";
import postRoutes from "../objects/post/post.routes";
import roleRoutes from "../objects/role/role.routes";
import likeRoutes from "../objects/like/like.routes";
import commentRoutes from "../objects/comment/comment.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/user", userRoutes);
    app.use("/post", postRoutes);
    app.use("/role", roleRoutes);
    app.use("/like", likeRoutes);
    app.use("/comment", commentRoutes);
  }
}
