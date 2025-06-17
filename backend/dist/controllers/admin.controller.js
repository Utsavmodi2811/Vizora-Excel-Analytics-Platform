"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleUserBlock = exports.updateUserRole = exports.getAllUsers = exports.deleteUser = exports.blockUser = exports.getUsers = exports.getDashboardStats = void 0;
const user_model_1 = require("../models/user.model");
const analysis_model_1 = require("../models/analysis.model");
const getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await user_model_1.User.countDocuments();
        const totalAnalyses = await analysis_model_1.Analysis.countDocuments();
        const chartTypes = await analysis_model_1.Analysis.aggregate([
            {
                $group: {
                    _id: '$chartType',
                    count: { $sum: 1 }
                }
            }
        ]);
        const recentAnalyses = await analysis_model_1.Analysis.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .populate('user', 'name email');
        res.json({
            stats: {
                totalUsers,
                totalAnalyses,
                chartTypes
            },
            recentAnalyses
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching dashboard stats' });
    }
};
exports.getDashboardStats = getDashboardStats;
const getUsers = async (req, res) => {
    try {
        const users = await user_model_1.User.find()
            .select('-password')
            .sort({ createdAt: -1 });
        res.json({ users });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
};
exports.getUsers = getUsers;
const blockUser = async (req, res) => {
    try {
        const user = await user_model_1.User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.isBlocked = !user.isBlocked;
        await user.save();
        res.json({
            message: user.isBlocked ? 'User blocked successfully' : 'User unblocked successfully',
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                isBlocked: user.isBlocked
            }
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating user status' });
    }
};
exports.blockUser = blockUser;
const deleteUser = async (req, res) => {
    try {
        const user = await user_model_1.User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Delete user's analyses
        await analysis_model_1.Analysis.deleteMany({ user: user._id });
        // Delete user
        await user.deleteOne();
        res.json({ message: 'User deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting user' });
    }
};
exports.deleteUser = deleteUser;
// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await user_model_1.User.find().select('-password');
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
};
exports.getAllUsers = getAllUsers;
// Update user role
const updateUserRole = async (req, res) => {
    try {
        const { userId } = req.params;
        const { role } = req.body;
        if (!['user', 'admin'].includes(role)) {
            return res.status(400).json({ message: 'Invalid role' });
        }
        const user = await user_model_1.User.findByIdAndUpdate(userId, { role }, { new: true }).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating user role' });
    }
};
exports.updateUserRole = updateUserRole;
// Block/Unblock user
const toggleUserBlock = async (req, res) => {
    try {
        const { userId } = req.params;
        const { isBlocked } = req.body;
        const user = await user_model_1.User.findByIdAndUpdate(userId, { isBlocked }, { new: true }).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating user status' });
    }
};
exports.toggleUserBlock = toggleUserBlock;
