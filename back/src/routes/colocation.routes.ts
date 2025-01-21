import { Router } from 'express';
import * as colocationController from "../controllers/colocation.controller";
import { checkJWT } from '../middlewares/security';

const routes = Router();

routes.post("/register", colocationController.registerColocation);
routes.get("/", colocationController.getAllColocations);
routes.get("/:id", colocationController.getColocationById);
routes.delete("/:id", colocationController.deleteColocation);
routes.patch("/:id", colocationController.updateColocation);
routes.put("/:id", colocationController.replaceColocation);

export default routes;
