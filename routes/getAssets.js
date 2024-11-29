import { Router } from "express";
import { assetsController } from "../controllers/assetsController.js";
import { jwtValidation } from "../middleware/jwt-validation.js";

export const getAssets = Router();

getAssets.get("/:charts",jwtValidation,assetsController)