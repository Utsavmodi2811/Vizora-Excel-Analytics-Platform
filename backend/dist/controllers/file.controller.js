"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileData = exports.getFileStats = exports.deleteFile = exports.downloadFile = exports.uploadFile = exports.getUserFiles = void 0;
const file_model_1 = require("../models/file.model");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const xlsx_1 = __importDefault(require("xlsx"));
// Configure multer for file upload
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        var _a;
        // Create user-specific directory
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            return cb(new Error('User not authenticated'), '');
        }
        const userDir = path_1.default.join(__dirname, '../../uploads', userId.toString());
        if (!fs_1.default.existsSync(userDir)) {
            fs_1.default.mkdirSync(userDir, { recursive: true });
        }
        cb(null, userDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path_1.default.extname(file.originalname));
    }
});
const upload = (0, multer_1.default)({ storage });
// Get all files for a specific user
const getUserFiles = async (req, res) => {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        const files = await file_model_1.File.find({ userId })
            .select('-fileData') // Don't send file data in the list
            .sort({ createdAt: -1 });
        res.json({ files });
    }
    catch (error) {
        console.error('Error getting user files:', error);
        res.status(500).json({ message: 'Error getting files' });
    }
};
exports.getUserFiles = getUserFiles;
// Upload a new file
const uploadFile = async (req, res) => {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        // Create user-specific directory if it doesn't exist
        const userDir = path_1.default.join(__dirname, '../../uploads', userId.toString());
        if (!fs_1.default.existsSync(userDir)) {
            fs_1.default.mkdirSync(userDir, { recursive: true });
        }
        const file = new file_model_1.File({
            userId,
            fileName: req.file.filename,
            originalName: req.file.originalname,
            fileType: req.file.mimetype,
            fileSize: req.file.size,
            fileData: fs_1.default.readFileSync(req.file.path)
        });
        await file.save();
        // Delete the temporary file after saving to database
        fs_1.default.unlinkSync(req.file.path);
        res.status(201).json({
            message: 'File uploaded successfully',
            file: {
                id: file._id,
                fileName: file.fileName,
                originalName: file.originalName,
                fileType: file.fileType,
                fileSize: file.fileSize,
                createdAt: file.createdAt
            }
        });
    }
    catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ message: 'Error uploading file' });
    }
};
exports.uploadFile = uploadFile;
// Download a file
const downloadFile = async (req, res) => {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        const file = await file_model_1.File.findOne({ _id: req.params.id, userId });
        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }
        res.setHeader('Content-Type', file.fileType);
        res.setHeader('Content-Disposition', `attachment; filename="${file.originalName}"`);
        res.send(file.fileData);
    }
    catch (error) {
        console.error('Error downloading file:', error);
        res.status(500).json({ message: 'Error downloading file' });
    }
};
exports.downloadFile = downloadFile;
// Delete a file
const deleteFile = async (req, res) => {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        const file = await file_model_1.File.findOne({ _id: req.params.id, userId });
        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }
        // Delete the file from user's directory
        const userDir = path_1.default.join(__dirname, '../../uploads', userId.toString());
        const filePath = path_1.default.join(userDir, file.fileName);
        if (fs_1.default.existsSync(filePath)) {
            fs_1.default.unlinkSync(filePath);
        }
        // Delete from database
        await file_model_1.File.deleteOne({ _id: req.params.id });
        res.json({ message: 'File deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting file:', error);
        res.status(500).json({ message: 'Error deleting file' });
    }
};
exports.deleteFile = deleteFile;
// Get file statistics for a user
const getFileStats = async (req, res) => {
    var _a, _b;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        const totalFiles = await file_model_1.File.countDocuments({ userId });
        const totalSize = await file_model_1.File.aggregate([
            { $match: { userId } },
            { $group: { _id: null, total: { $sum: '$fileSize' } } }
        ]);
        const fileTypes = await file_model_1.File.aggregate([
            { $match: { userId } },
            { $group: { _id: '$fileType', count: { $sum: 1 } } }
        ]);
        res.json({
            totalFiles,
            totalSize: ((_b = totalSize[0]) === null || _b === void 0 ? void 0 : _b.total) || 0,
            fileTypes
        });
    }
    catch (error) {
        console.error('Error getting file stats:', error);
        res.status(500).json({ message: 'Error getting file statistics' });
    }
};
exports.getFileStats = getFileStats;
// Get file data for re-analysis
const getFileData = async (req, res) => {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        const file = await file_model_1.File.findOne({ _id: req.params.id, userId });
        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }
        // Parse the Excel data from the stored buffer
        const workbook = xlsx_1.default.read(file.fileData, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = xlsx_1.default.utils.sheet_to_json(worksheet);
        const columns = jsonData.length > 0 ? Object.keys(jsonData[0]) : [];
        res.json({
            file: {
                id: file._id,
                fileName: file.originalName,
                fileType: file.fileType,
                fileSize: file.fileSize,
                uploadDate: file.createdAt,
                data: jsonData,
                columns: columns
            }
        });
    }
    catch (error) {
        console.error('Error getting file data:', error);
        res.status(500).json({ message: 'Error getting file data' });
    }
};
exports.getFileData = getFileData;
