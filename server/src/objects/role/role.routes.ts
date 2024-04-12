import RoleController from "./role.controller";
import BaseRoutes from "../../base/base.routes";

class RoleRoutes extends BaseRoutes {
  private controller: RoleController;

  constructor() {
    super();
    this.controller = new RoleController();
    this.initializeRoutes();
  }

  protected initializeRoutes (): void {
    this.router.post("/promote", this.controller.promoteUserRole.bind(this.controller));
    this.router.get("/getrole", this.controller.getRoleByUser.bind(this.controller));
    this.router.get("/findallbyid", this.controller.findAllUsersByRoleId.bind(this.controller));
  }
}

export default new RoleRoutes().router;
