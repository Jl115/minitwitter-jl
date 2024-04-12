import UserController from "./user.controller";
import BaseRoutes from "../../base/base.routes";

class UserRoutes extends BaseRoutes {
  private controller: UserController;

  constructor() {
    super();
    this.controller = new UserController();
    this.initializeRoutes();
  }

  protected initializeRoutes () {
    this.router.post("/login", this.controller.login.bind(this.controller));
    this.router.post("/register", this.controller.register.bind(this.controller));
    this.router.get("/findall", this.controller.findAllUsers.bind(this.controller));
    this.router.put("/update", this.controller.updateUser.bind(this.controller));
    this.router.delete("/delete", this.controller.delete.bind(this.controller));
  }
}

export default new UserRoutes().router;
