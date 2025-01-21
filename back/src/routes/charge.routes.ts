import { Router } from "express";
import  * as chargeController  from "../controllers/charge.controller";

const router = Router();

router.post("/", chargeController.createCharge);
router.get("/", chargeController.getCharges);
router.put("/:id", chargeController.updateCharge);
router.delete("/:id", chargeController.deleteCharge);

export default router;
