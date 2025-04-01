import { Router } from "express";

import sessionsRouter from "./sessions.routes.js";
import userRouter from "./api/users.routes.js";
import productRouter from "./api/products.routes.js";
import cartRouter from "./api/carts.routes.js";

const indexRouter = Router();

indexRouter.use("/api/sessions", sessionsRouter);
indexRouter.use("/api/users", userRouter);
indexRouter.use("/api/products", productRouter);
indexRouter.use("/api/carts", cartRouter);

indexRouter.use("*", (req, res) => {
    res.status(404).json({ status: "error", message: "Ruta no encontrada" });
});

export default indexRouter;