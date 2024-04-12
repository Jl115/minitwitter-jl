import PostController from "./post.controller";
import BaseRoutes from "../../base/base.routes";

class PostRoutes extends BaseRoutes {
  private controller: PostController;

  constructor() {
    super();
    this.controller = new PostController();
    this.initializeRoutes();
  }

  protected initializeRoutes (): void {
    this.router.post("/create", this.controller.createPost.bind(this.controller));
    this.router.get("/postdetail", this.controller.getPost.bind(this.controller));
    this.router.get("/findall", this.controller.findAllPosts.bind(this.controller));
    this.router.put("/update", this.controller.updatePost.bind(this.controller));
    this.router.delete("/delete/:postId", this.controller.deletePost.bind(this.controller));
  }
}

export default new PostRoutes().router;
