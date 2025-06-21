"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chart_controller_1 = require("../controllers/chart.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
// All routes require authentication
router.use(auth_middleware_1.auth);
// Get chart data
router.get('/data/:analysisId', chart_controller_1.getChartData);
// Download chart as image
router.get('/download/:analysisId', chart_controller_1.downloadChart);
// Get analysis history
router.get('/history', chart_controller_1.getAnalysisHistory);
// Create a new chart
router.post('/create', chart_controller_1.createChart);
exports.default = router;
