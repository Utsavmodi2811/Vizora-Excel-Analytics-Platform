"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAnalysis = exports.updateAnalysis = exports.createAnalysis = exports.getAnalysisHistory = void 0;
const analysis_model_1 = require("../models/analysis.model");
// Get user's analysis history
const getAnalysisHistory = async (req, res) => {
    try {
        const analyses = await analysis_model_1.Analysis.find({ userId: req.user._id })
            .sort({ createdAt: -1 })
            .limit(50);
        res.json({ analyses });
    }
    catch (error) {
        console.error('Error fetching analysis history:', error);
        res.status(500).json({ message: 'Error fetching analysis history' });
    }
};
exports.getAnalysisHistory = getAnalysisHistory;
// Create new analysis record
const createAnalysis = async (req, res) => {
    try {
        const { fileName, fileType, fileSize, analysisType } = req.body;
        const analysis = new analysis_model_1.Analysis({
            userId: req.user._id,
            fileName,
            fileType,
            fileSize,
            analysisType,
            status: 'pending'
        });
        await analysis.save();
        res.status(201).json({ analysis });
    }
    catch (error) {
        console.error('Error creating analysis:', error);
        res.status(500).json({ message: 'Error creating analysis' });
    }
};
exports.createAnalysis = createAnalysis;
// Update analysis result
const updateAnalysis = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, result, error } = req.body;
        const analysis = await analysis_model_1.Analysis.findOneAndUpdate({ _id: id, userId: req.user._id }, { status, result, error }, { new: true });
        if (!analysis) {
            return res.status(404).json({ message: 'Analysis not found' });
        }
        res.json({ analysis });
    }
    catch (error) {
        console.error('Error updating analysis:', error);
        res.status(500).json({ message: 'Error updating analysis' });
    }
};
exports.updateAnalysis = updateAnalysis;
// Delete analysis
const deleteAnalysis = async (req, res) => {
    try {
        const { id } = req.params;
        const analysis = await analysis_model_1.Analysis.findOneAndDelete({
            _id: id,
            userId: req.user._id
        });
        if (!analysis) {
            return res.status(404).json({ message: 'Analysis not found' });
        }
        res.json({ message: 'Analysis deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting analysis:', error);
        res.status(500).json({ message: 'Error deleting analysis' });
    }
};
exports.deleteAnalysis = deleteAnalysis;
