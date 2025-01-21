import { Router } from 'express';
import * as colocationController from "../controllers/colocation.controller";
import { checkJWT } from '../middlewares/security';

const routes = Router();

routes.post("/register", checkJWT, colocationController.registerColocation);
routes.get("/", checkJWT ,colocationController.getAllColocations);
routes.get("/:id", checkJWT, colocationController.getColocationById);
routes.delete("/:id", checkJWT, colocationController.deleteColocation);
routes.patch("/:id", checkJWT, colocationController.updateColocation);
routes.put("/:id", checkJWT, colocationController.replaceColocation);

export default routes;
