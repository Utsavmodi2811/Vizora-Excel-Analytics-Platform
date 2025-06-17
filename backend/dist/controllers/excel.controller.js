"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processExcel = exports.uploadExcel = void 0;
const XLSX = __importStar(require("xlsx"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const analysis_model_1 = require("../models/analysis.model");
const uploadExcel = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        res.status(200).json({
            message: 'File uploaded successfully',
            file: {
                filename: req.file.filename,
                path: req.file.path
            }
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error uploading file' });
    }
};
exports.uploadExcel = uploadExcel;
const processExcel = async (req, res) => {
    try {
        const { filePath, chartType, xAxis, yAxis } = req.body;
        if (!filePath || !chartType || !xAxis || !yAxis) {
            return res.status(400).json({ message: 'Missing required parameters' });
        }
        // Read the Excel file
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);
        // Get file stats
        const stats = fs_1.default.statSync(filePath);
        // Create new analysis record
        const analysis = new analysis_model_1.Analysis({
            userId: req.user._id,
            fileName: path_1.default.basename(filePath),
            fileType: path_1.default.extname(filePath).slice(1),
            fileSize: stats.size,
            analysisType: chartType,
            status: 'completed',
            result: {
                chartType,
                xAxis,
                yAxis,
                data
            }
        });
        await analysis.save();
        // Clean up the file after processing
        fs_1.default.unlinkSync(filePath);
        res.status(200).json({
            message: 'Excel file processed successfully',
            analysis: {
                id: analysis._id,
                fileName: analysis.fileName,
                fileType: analysis.fileType,
                fileSize: analysis.fileSize,
                analysisType: analysis.analysisType,
                status: analysis.status,
                result: analysis.result
            }
        });
    }
    catch (error) {
        console.error('Error processing Excel file:', error);
        res.status(500).json({ message: 'Error processing Excel file' });
    }
};
exports.processExcel = processExcel;
