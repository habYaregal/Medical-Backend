import express from "express";
import { rigsterPataint, getAllPataintsByUser, downloadFile } from "../Controllers/pataintController.js";
import { verifyToken, checkAdminRole } from "../Middlewares/authMiddlewar.js";
const router = express.Router();


router.post('/rigster', verifyToken, checkAdminRole, rigsterPataint);
router.get('/', verifyToken, checkAdminRole, getAllPataintsByUser);
router.get('/download',verifyToken, checkAdminRole, downloadFile);

export default router;