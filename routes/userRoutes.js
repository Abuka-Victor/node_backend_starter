import express from 'express';
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
} from '../controllers/userController.js';
import { verifyAuth } from '../middleware/authMiddleware.js';

const userRouter = express.Router();

userRouter.post('/', registerUser);
userRouter.post('/auth', authUser);
userRouter.post('/logout', logoutUser);
userRouter
  .route('/profile')
  .get(verifyAuth, getUserProfile)
  .put(verifyAuth, updateUserProfile)
  .delete(verifyAuth, deleteUserProfile);

export default userRouter;
