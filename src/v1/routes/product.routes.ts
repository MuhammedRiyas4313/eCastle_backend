import express from "express";
import { productSchema } from "schemas/product.schema";
import { validate } from "utils/validate";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "v1/controllers/product.controller";

const router = express.Router();

router.post("/", validate(productSchema), createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/", validate(productSchema), updateProduct);
router.delete("/", deleteProduct);

export default router;
