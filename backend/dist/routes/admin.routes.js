"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("../controllers/admin.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const admin_controller_2 = require("../controllers/admin.controller");
const router = express_1.default.Router();
// Admin only routes
router.get('/dashboard', auth_middleware_1.adminAuth, admin_controller_1.getDashboardStats);
router.get('/users', auth_middleware_1.adminAuth, admin_controller_1.getUsers);
router.patch('/users/:userId/block', auth_middleware_1.adminAuth, admin_controller_1.blockUser);
router.delete('/users/:userId', auth_middleware_1.adminAuth, admin_controller_1.deleteUser);
// All routes are protected with adminAuth middleware
router.use(auth_middleware_1.adminAuth);
// Get all users
router.get('/users', admin_controller_2.getAllUsers);
// Update user role
router.patch('/users/:userId/role', admin_controller_2.updateUserRole);
// Toggle user block status
router.patch('/users/:userId/block', admin_controller_2.toggleUserBlock);
exports.default = router;
