import { Router } from "express";
import { getUsers, getUser, createUser, updateUser, deleteUser } from "../../controllers/users.controllers.js";
import { authorization } from "../../config/authorization.js";
import passport from "passport";

const userRouter = Router();

userRouter.get("/", passport.authenticate("jwt"), authorization("admin"), getUsers);
userRouter.get("/:uid", passport.authenticate("jwt"), authorization("admin"), getUser);
userRouter.post("/", passport.authenticate("jwt"), authorization("admin"), createUser);
userRouter.put("/:uid", passport.authenticate("jwt"), authorization("admin"), updateUser);
userRouter.delete("/:uid", passport.authenticate("jwt"), authorization("admin"), deleteUser);

export default userRouter;