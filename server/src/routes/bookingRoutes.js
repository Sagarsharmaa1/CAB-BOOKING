import express from 'express';

import {
  createRide,
  deleteRide,
  getAllRides,
  getUserRides
} from '../controllers/bookingController.js';

import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/rides', authMiddleware, createRide);

router.get('/getrides', authMiddleware, getAllRides);

router.get('/getrides/:userId', authMiddleware, getUserRides);

router.delete('/usercardelete/:id', authMiddleware, deleteRide);

export default router;