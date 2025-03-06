import { Router } from "express";
import { getUsers, getUser, createUser, updateUser, deleteUser } from "../../controllers/users.controllers.js";
import { authorization } from "../../config/authorization.js";
import passport from "passport";

const userRouter = Router();

userRouter.get("/", passport.authenticate("jwt"), authorization("Admin"), getUsers);
userRouter.get("/:uid", passport.authenticate("jwt"), authorization("Admin"), getUser);
userRouter.post("/", passport.authenticate("jwt"), authorization("Admin"), createUser);
userRouter.put("/:uid", passport.authenticate("jwt"), authorization("Admin"), updateUser);
userRouter.delete("/:uid", passport.authenticate("jwt"), authorization("Admin"), deleteUser);

export default userRouter;