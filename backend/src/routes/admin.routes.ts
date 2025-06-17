import express from 'express';
import { getDashboardStats, getUsers, blockUser, deleteUser } from '../controllers/admin.controller';
import { adminAuth } from '../middleware/auth.middleware';
import { getAllUsers, updateUserRole, toggleUserBlock } from '../controllers/admin.controller';

const router = express.Router();

// Admin only routes
router.get('/dashboard', adminAuth, getDashboardStats);
router.get('/users', adminAuth, getUsers);
router.patch('/users/:userId/block', adminAuth, blockUser);
router.delete('/users/:userId', adminAuth, deleteUser);

// All routes are protected with adminAuth middleware
router.use(adminAuth);

// Get all users
router.get('/users', getAllUsers);

// Update user role
router.patch('/users/:userId/role', updateUserRole);

// Toggle user block status
router.patch('/users/:userId/block', toggleUserBlock);

export default router; 