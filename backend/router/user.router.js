import { Router } from "express";
import { registerUser ,loginUser,logoutUser,getProfile ,changePassword} from "../controller/user.controller.js";
import { authCheck } from "../middleware/authcheck.middleware.js";

const router = Router();


router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", authCheck, logoutUser);
router.get("/profile", authCheck, getProfile);
router.post("/change-password", authCheck, changePassword);



export default router;