import express from "express";

import indexRouter from "v1/routes/index.routes";

import userRouter from "v1/routes/user.routes";
import productRouter from "v1/routes/product.routes";

const router = express.Router();

router.use("/", indexRouter);

//USER
router.use("/user", userRouter);

//PRODUCTS
router.use("/products", productRouter);

export default router;
