import express from "express";
import { deleteUserByEmail, rigsterUser, changePassword, getAllUsers } from "../Controllers/userController.js";
import { verifyToken, checkAdminRole, checkSuperAdminRole } from "../Middlewares/authMiddlewar.js";
const router = express.Router();

router.get('/',verifyToken, checkSuperAdminRole, getAllUsers);
router.post('/rigster',verifyToken, checkSuperAdminRole, rigsterUser);
router.delete('/delete',verifyToken, checkSuperAdminRole, deleteUserByEmail);
router.put('/changepassword', verifyToken, changePassword);


export default router;