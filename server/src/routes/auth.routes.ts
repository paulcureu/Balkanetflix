import { Router } from "express";
import { validate } from "../middleware/validate";
import { registerUserSchema, loginUserSchema } from "../schemas/auth.schema";
import {
  registerUserHandler,
  loginUserHandler,
} from "../controllers/auth.controller";

const router = Router();

router.post("/register", validate(registerUserSchema), registerUserHandler);
router.post("/login", validate(loginUserSchema), loginUserHandler);

export default router;
