import { Router } from "express";
import {
  createWifi,
  deleteWifi,
  getWifis,
} from "../controllers/wifisController.js";
import { validateToken } from "../middlewares/authMiddleware.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { createWifiSchema } from "../schemas/wifisSchema.js";

const wifisRouter = Router();

wifisRouter.post(
  "/wifis",
  validateToken,
  validateSchema(createWifiSchema),
  createWifi
);
wifisRouter.get("/wifis", validateToken, getWifis);
wifisRouter.delete("/wifis/:id", validateToken, deleteWifi);

export default wifisRouter;
