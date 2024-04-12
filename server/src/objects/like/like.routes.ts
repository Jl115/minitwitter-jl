import BaseRoutes from "../../base/base.routes";
import LikeController from "./like.controller";

class LikeRoutes extends BaseRoutes {
  private controller: LikeController;

  constructor() {
    super();
    this.controller = new LikeController();
    this.initializeRoutes();
  }

  protected initializeRoutes () {

    this.router.post("/create", this.controller.createLike.bind(this.controller));
    this.router.get("/postlikes", this.controller.getAllLikes.bind(this.controller));
    this.router.get("/findalllikedposts", this.controller.findAllLikedPostsById.bind(this.controller));
    this.router.delete(`/delete/:userId/:postId`, this.controller.deleteLike.bind(this.controller));
  }
}

export default new LikeRoutes().router;
