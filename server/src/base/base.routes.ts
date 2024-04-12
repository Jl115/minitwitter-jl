import { Router } from "express";

abstract class BaseRoutes {
  public router: Router = Router();




  protected abstract initializeRoutes (): void;
}

export default BaseRoutes;
