"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chart_controller_1 = require("../controllers/chart.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
// Protected routes
router.get('/data/:analysisId', auth_middleware_1.auth, chart_controller_1.getChartData);
router.get('/download/:analysisId', auth_middleware_1.auth, chart_controller_1.downloadChart);
router.get('/history', auth_middleware_1.auth, chart_controller_1.getAnalysisHistory);
exports.default = router;
