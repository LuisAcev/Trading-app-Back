import { Router } from "express";
import { jwtValidationAssets } from "../middleware/jwt-validation.js";
import { calculatorController } from "../controllers/calculatorController.js";

export const getCalculatorRouter = Router();

getCalculatorRouter.get("/calculatorinfo",jwtValidationAssets,calculatorController);