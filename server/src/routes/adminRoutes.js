import express from 'express';
import { adminLogin, adminRegister } from '../controllers/adminController.js';

const router = express.Router();

router.post('/alogin', adminLogin);
router.post('/aregister', adminRegister);

export default router;