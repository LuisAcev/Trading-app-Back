import { Router } from "express";
import { assetsController } from "../controllers/assetsController.js";
import { jwtValidationAssets } from "../middleware/jwt-validation.js";

export const getAssets = Router();

getAssets.get("/:charts/:asset",jwtValidationAssets,assetsController)