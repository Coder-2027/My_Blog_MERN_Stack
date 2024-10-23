import {Router} from 'express';
import { updateUser, deleteUser, signout, getUsers } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = Router();

router.route('/update/:userId').put(verifyToken, updateUser);
router.route('/delete/:userId').delete(verifyToken, deleteUser);
router.route('/signout').post(signout);
router.route('/getUsers').post(verifyToken, getUsers);

export default router;