"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../models/user.model");
const auth = async (req, res, next) => {
    try {
        console.log('Auth middleware - Headers:', req.headers);
        const authHeader = req.header('Authorization');
        console.log('Auth header:', authHeader);
        if (!authHeader) {
            console.log('No Authorization header found');
            return res.status(401).json({ message: 'Authentication required' });
        }
        const token = authHeader.replace('Bearer ', '');
        console.log('Token:', token);
        if (!token) {
            console.log('No token found in Authorization header');
            return res.status(401).json({ message: 'Authentication required' });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        console.log('Decoded token:', decoded);
        if (!decoded || !decoded.id) {
            console.log('Invalid token structure');
            return res.status(401).json({ message: 'Invalid token' });
        }
        const user = await user_model_1.User.findById(decoded.id).select('-password');
        console.log('Found user:', user);
        if (!user) {
            console.log('User not found');
            return res.status(401).json({ message: 'User not found' });
        }
        if (user.isBlocked) {
            console.log('User is blocked');
            return res.status(403).json({ message: 'Account is blocked' });
        }
        // Attach user to request
        req.user = user;
        console.log('User attached to request:', req.user);
        next();
    }
    catch (error) {
        console.error('Auth middleware error:', error);
        res.status(401).json({ message: 'Invalid token' });
    }
};
exports.auth = auth;
