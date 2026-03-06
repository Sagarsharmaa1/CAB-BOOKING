import express from 'express';

import {
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
  userLogin,
  userRegister
} from '../controllers/userController.js';

import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', userLogin);

router.post('/register', userRegister);

router.get('/getusers', authMiddleware, getAllUsers);

router.get('/getuser/:id', authMiddleware, getUserById);

router.put('/useredit/:id', authMiddleware, updateUser);

router.delete('/userdelete/:id', authMiddleware, deleteUser);

export default router;