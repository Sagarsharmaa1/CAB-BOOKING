import express from 'express';

import {
  createCar,
  deleteCar,
  getAllCars,
  getCarByFind,
  getCarById,
  updateCar
} from '../controllers/carController.js';

import upload from '../middleware/multer.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/cars', upload.single('carImage'), authMiddleware, createCar);

router.get('/cars', getAllCars);

router.get('/car/:id', getCarByFind);

router.get('/acar/:id', getCarById);

router.put('/acaredit/:id', authMiddleware, upload.single('image'), updateCar);

router.delete('/cardelete/:id', authMiddleware, deleteCar);

export default router;