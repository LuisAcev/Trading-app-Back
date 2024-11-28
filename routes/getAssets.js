import { Router } from "express";
import { assetsController } from "../controllers/assetsController.js";

export const getAssets = Router();

getAssets.get("/:charts",assetsController)