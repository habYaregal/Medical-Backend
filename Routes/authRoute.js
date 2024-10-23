import express from "express";
import { login, logout } from "../Controllers/authController.js";
import { verifyToken } from "../Middlewares/authMiddlewar.js";
const router = express.Router();

router.post('/login', login);
router.post('/logout',verifyToken, logout);


export default router;