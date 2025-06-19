import express from "express";
import { userSchema } from "schemas/user.schema";
import { validate } from "utils/validate";
import { login } from "v1/controllers/user.controller";

const router = express.Router();

router.post("/login", validate(userSchema), login);

export default router;
