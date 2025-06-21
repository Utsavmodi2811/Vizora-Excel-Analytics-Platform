"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("../controllers/admin.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
// All routes are protected with adminAuth middleware
router.use(auth_middleware_1.adminAuth);
// Dashboard stats
router.get('/dashboard', admin_controller_1.getDashboardStats);
// User management
router.get('/users', admin_controller_1.getUsers);
router.patch('/users/:userId/role', admin_controller_1.updateUserRole);
router.patch('/users/:userId/block', admin_controller_1.toggleUserBlock);
router.delete('/users/:userId', admin_controller_1.deleteUser);
exports.default = router;
