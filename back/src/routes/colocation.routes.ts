import { Router } from 'express';
import * as colocationController from "../controllers/colocation.controller";

const routes = Router();

routes.post("/register", colocationController.registerColocation);
routes.get("/", colocationController.getAllColocations);
routes.get("/:id", colocationController.getColocationById);
routes.delete("/:id", colocationController.deleteColocation);

export default routes;
