import { Router } from "express";
import * as distributionController from "../controllers/distribution.controller";
import { checkJWT } from "../middlewares/security";

const router = Router();

router.post("/", checkJWT, distributionController.createDistribution);
router.get("/", checkJWT, distributionController.getDistributions);
router.put("/:id", checkJWT, distributionController.updateDistribution);
router.delete("/:id", checkJWT, distributionController.deleteDistribution);

export default router;
