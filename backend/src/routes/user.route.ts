import { Router } from "express";
import loginRoute from "../controllers/user/loginRoute";
import signUpRoute from "../controllers/user/signUpRoute";
import { validateRequest, validateUser } from "./../utils/validators";

const router = Router();
router.post("/login", loginRoute);
router.post("/signup", validateRequest(validateUser), signUpRoute);
export default router;
