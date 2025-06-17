import express from 'express';
import { getChartData, downloadChart, getAnalysisHistory } from '../controllers/chart.controller';
import { auth } from '../middleware/auth.middleware';

const router = express.Router();

// Protected routes
router.get('/data/:analysisId', auth, getChartData);
router.get('/download/:analysisId', auth, downloadChart);
router.get('/history', auth, getAnalysisHistory);

export default router; 