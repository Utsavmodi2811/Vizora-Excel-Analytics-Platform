import express from 'express';
import { register, login, getCurrentUser, heartbeat, updateProfile, requestPasswordReset, resetPassword } from '../controllers/auth.controller';
import { auth } from '../middleware/auth.middleware';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', requestPasswordReset);
router.post('/reset-password', resetPassword);

// Protected routes
router.get('/me', auth, getCurrentUser);
router.get('/profile', auth, getCurrentUser);
router.patch('/profile', auth, updateProfile);
router.post('/heartbeat', auth, heartbeat);

export default router; 