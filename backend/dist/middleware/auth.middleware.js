"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuth = exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../models/user.model");
const auth = async (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'No authentication token, access denied' });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = await user_model_1.User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        if (user.isBlocked) {
            return res.status(403).json({ message: 'Account has been blocked' });
        }
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Token is invalid' });
    }
};
exports.auth = auth;
const adminAuth = async (req, res, next) => {
    try {
        await (0, exports.auth)(req, res, () => {
            if (req.user.role !== 'admin') {
                return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
            }
            next();
        });
    }
    catch (error) {
        res.status(401).json({ message: 'Authentication failed' });
    }
};
exports.adminAuth = adminAuth;
