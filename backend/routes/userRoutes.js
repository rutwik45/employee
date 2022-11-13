import express from "express";
import { authUser,getUsers,registerUser,deleteUser} from "../controllers/userController.js";
const router=express.Router();

router.post('/login',authUser)
router.route('/').post(registerUser).get(getUsers)
router.route('/:id').delete(deleteUser)

export default router