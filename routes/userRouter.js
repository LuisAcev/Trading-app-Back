import { Router } from "express";
import { deletUsers, getUsers, postUsers, putUsers } from "../controllers/usersController.js";

export const usersRouter = Router();

usersRouter.get("/getUser", getUsers); // getUser?email=test@gmail.com&password=*****
usersRouter.post("/post", postUsers);
usersRouter.put("/:id", putUsers);
usersRouter.delete("/:id", deletUsers);