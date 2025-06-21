"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createChart = exports.getAnalysisHistory = exports.downloadChart = exports.getChartData = void 0;
const analysis_model_1 = require("../models/analysis.model");
const chart_utils_1 = require("../utils/chart.utils");
const getChartData = async (req, res) => {
    try {
        const analysis = await analysis_model_1.Analysis.findOne({
            _id: req.params.analysisId,
            userId: req.user._id
        });
        if (!analysis) {
            return res.status(404).json({ message: 'Analysis not found' });
        }
        if (!analysis.result) {
            return res.status(400).json({ message: 'No chart data available' });
        }
        res.json({
            chartType: analysis.result.chartType,
            xAxis: analysis.result.xAxis,
            yAxis: analysis.result.yAxis,
            data: analysis.result.data,
            summary: analysis.result.summary
        });
    }
    catch (error) {
        console.error('Error fetching chart data:', error);
        res.status(500).json({ message: 'Error fetching chart data' });
    }
};
exports.getChartData = getChartData;
const downloadChart = async (req, res) => {
    try {
        const analysis = await analysis_model_1.Analysis.findOne({
            _id: req.params.analysisId,
            userId: req.user._id
        });
        if (!analysis) {
            return res.status(404).json({ message: 'Analysis not found' });
        }
        if (!analysis.result) {
            return res.status(400).json({ message: 'No chart data available' });
        }
        const imageBuffer = await (0, chart_utils_1.generateChartImage)({
            chartType: analysis.result.chartType,
            xAxis: analysis.result.xAxis,
            yAxis: analysis.result.yAxis,
            data: analysis.result.data
        });
        res.setHeader('Content-Type', 'image/png');
        res.setHeader('Content-Disposition', `attachment; filename=${analysis.fileName}.png`);
        res.send(imageBuffer);
    }
    catch (error) {
        console.error('Error generating chart image:', error);
        res.status(500).json({ message: 'Error generating chart image' });
    }
};
exports.downloadChart = downloadChart;
const getAnalysisHistory = async (req, res) => {
    try {
        const analyses = await analysis_model_1.Analysis.find({ userId: req.user._id })
            .select('fileName fileType fileSize analysisType status createdAt result')
            .sort({ createdAt: -1 });
        res.json({ analyses });
    }
    catch (error) {
        console.error('Error fetching analysis history:', error);
        res.status(500).json({ message: 'Error fetching analysis history' });
    }
};
exports.getAnalysisHistory = getAnalysisHistory;
const createChart = async (req, res) => {
    try {
        const { fileName, chartType, xAxis, yAxis, data } = req.body;
        if (!fileName || !chartType || !xAxis || !yAxis || !data) {
            return res.status(400).json({ message: 'Missing required parameters' });
        }
        // Create new analysis record
        const analysis = new analysis_model_1.Analysis({
            userId: req.user._id,
            fileName: fileName,
            fileType: 'xlsx', // Default file type
            fileSize: 0, // We don't have the actual file size
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
        res.status(201).json({
            message: 'Chart created successfully',
            analysis: {
                id: analysis._id,
                fileName: analysis.fileName,
                fileType: analysis.fileType,
                fileSize: analysis.fileSize,
                analysisType: analysis.analysisType,
                status: analysis.status,
                result: analysis.result,
                createdAt: analysis.createdAt
            }
        });
    }
    catch (error) {
        console.error('Error creating chart:', error);
        res.status(500).json({ message: 'Error creating chart' });
    }
};
exports.createChart = createChart;
