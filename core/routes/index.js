import express from 'express';
import userRoutes from './userRoutes.js';
import authRoutes from './authRoutes.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello, world!');
  });
router.use('/users', userRoutes);
router.use('/auth', authRoutes);
export default router;
