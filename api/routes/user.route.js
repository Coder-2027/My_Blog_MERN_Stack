import {Router} from 'express';
import { updateUser, deleteUser, signout } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = Router();

router.route('/update/:userId').put(verifyToken, updateUser);
router.route('/delete/:userId').delete(verifyToken, deleteUser);
router.route('/signout').post(signout);

export default router;