"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.heartbeat = exports.getCurrentUser = exports.login = exports.register = void 0;
const user_model_1 = require("../models/user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
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
