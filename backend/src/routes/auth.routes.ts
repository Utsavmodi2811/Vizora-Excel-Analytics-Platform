import express from 'express';
import { register, login, getCurrentUser, heartbeat } from '../controllers/auth.controller';
import { auth } from '../middleware/auth.middleware';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/me', auth, getCurrentUser);
router.get('/profile', auth, getCurrentUser);
router.post('/heartbeat', auth, heartbeat);

export default router; 