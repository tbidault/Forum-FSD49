import express from 'express';
import userRoutes from './userRoutes.js';
import postRoutes from './postRoutes.js';
import threadRoutes from './threadRoutes.js';
import sectionRoutes from './sectionRoutes.js';
import authRoutes from './authRoutes.js';
import { authMiddleware } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello, world!');
  });
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/threads', threadRoutes);
router.use('/sections', sectionRoutes);
router.use('/auth', authRoutes);
export default router;
