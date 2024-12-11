import { Router } from "express";
import {
  deletUsers,
  getUsers,
  postUsers,
  putUsers,
} from "../controllers/usersController.js";
import { jwtValidationAssets } from "../middleware/jwt-validation.js";

export const usersRouter = Router();

usersRouter.get("/getuser", jwtValidationAssets, getUsers); // getuser?email=test@gmail.com&password=*****
usersRouter.post("/post", jwtValidationAssets, postUsers);
usersRouter.put("/:id", jwtValidationAssets, putUsers);
usersRouter.delete("/:id", jwtValidationAssets, deletUsers);
