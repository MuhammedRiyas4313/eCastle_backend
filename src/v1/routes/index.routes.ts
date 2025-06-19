import express from "express";
import { indexGet } from "v1/controllers/indext.controller";

const router = express.Router();

router.get("/", indexGet);

export default router;
