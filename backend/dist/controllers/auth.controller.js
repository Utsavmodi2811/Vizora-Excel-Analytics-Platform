"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.requestPasswordReset = exports.updateProfile = exports.heartbeat = exports.getCurrentUser = exports.login = exports.register = void 0;
const user_model_1 = require("../models/user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const email_service_1 = require("../services/email.service");
// Register a new user
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Check if user already exists
        const existingUser = await user_model_1.User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Hash password
        const salt = await bcryptjs_1.default.genSalt(10);
        const hashedPassword = await bcryptjs_1.default.hash(password, salt);
        // Create new user
        const user = new user_model_1.User({
            name,
            email,
            password: hashedPassword,
            role: 'user',
            isBlocked: false
        });
        await user.save();
        // Send welcome email
        try {
            await (0, email_service_1.sendWelcomeEmail)(email, name);
        }
        catch (emailError) {
            console.error('Failed to send welcome email:', emailError);
            // Continue with registration even if email fails
        }
        // Generate token with user role
        const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '24h' });
        // Return user data without password
        const userData = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            isBlocked: user.isBlocked
        };
        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: userData
        });
    }
    catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Error registering user' });
    }
};
exports.register = register;
// Login user
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find user
        const user = await user_model_1.User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Check if user is blocked
        if (user.isBlocked) {
            return res.status(403).json({ message: 'Account is blocked' });
        }
        // Verify password
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Update last active timestamp
        try {
            user.lastActive = new Date();
            await user.save();
        }
        catch (saveError) {
            console.error('Error updating lastActive:', saveError);
            // Continue with login even if lastActive update fails
        }
        // Generate token with user role
        const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '24h' });
        // Return user data without password
        const userData = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            isBlocked: user.isBlocked
        };
        res.json({
            message: 'Login successful',
            token,
            user: userData
        });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Error logging in' });
    }
};
exports.login = login;
// Get current user
const getCurrentUser = async (req, res) => {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        const user = await user_model_1.User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Update last active timestamp
        try {
            user.lastActive = new Date();
            await user.save();
        }
        catch (saveError) {
            console.error('Error updating lastActive:', saveError);
            // Continue even if lastActive update fails
        }
        res.json({ user });
    }
    catch (error) {
        console.error('Get current user error:', error);
        res.status(500).json({ message: 'Error getting user data' });
    }
};
exports.getCurrentUser = getCurrentUser;
// Heartbeat endpoint to keep user active
const heartbeat = async (req, res) => {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        const user = await user_model_1.User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Update last active timestamp
        try {
            user.lastActive = new Date();
            await user.save();
        }
        catch (saveError) {
            console.error('Error updating lastActive:', saveError);
            // Continue even if lastActive update fails
        }
        res.json({ message: 'Heartbeat received' });
    }
    catch (error) {
        console.error('Heartbeat error:', error);
        res.status(500).json({ message: 'Error updating heartbeat' });
    }
};
exports.heartbeat = heartbeat;
// Update user profile (name, emailNotifications)
const updateProfile = async (req, res) => {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        const { name, emailNotifications } = req.body;
        const updateFields = {};
        if (typeof name === 'string' && name.trim())
            updateFields.name = name.trim();
        if (typeof emailNotifications === 'boolean')
            updateFields.emailNotifications = emailNotifications;
        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ message: 'No valid fields to update' });
        }
        const user = await user_model_1.User.findByIdAndUpdate(userId, { $set: updateFields }, { new: true, select: '-password' });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ user });
    }
    catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ message: 'Error updating profile' });
    }
};
exports.updateProfile = updateProfile;
// Request password reset
const requestPasswordReset = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await user_model_1.User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Generate reset token (valid for 1 hour)
        const resetToken = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '1h' });
        // Create reset link
        const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;
        // Send password reset email
        try {
            await (0, email_service_1.sendPasswordResetEmail)(email, resetLink);
            res.json({ message: 'Password reset email sent successfully' });
        }
        catch (emailError) {
            console.error('Failed to send password reset email:', emailError);
            res.status(500).json({ message: 'Failed to send password reset email' });
        }
    }
    catch (error) {
        console.error('Password reset request error:', error);
        res.status(500).json({ message: 'Error processing password reset request' });
    }
};
exports.requestPasswordReset = requestPasswordReset;
// Reset password with token
const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        if (!token || !newPassword) {
            return res.status(400).json({ message: 'Token and new password are required' });
        }
        // Verify token
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        const user = await user_model_1.User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Hash new password
        const salt = await bcryptjs_1.default.genSalt(10);
        const hashedPassword = await bcryptjs_1.default.hash(newPassword, salt);
        // Update password
        user.password = hashedPassword;
        await user.save();
        res.json({ message: 'Password reset successfully' });
    }
    catch (error) {
        console.error('Password reset error:', error);
        res.status(500).json({ message: 'Error resetting password' });
    }
};
exports.resetPassword = resetPassword;
