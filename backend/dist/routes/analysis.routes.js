"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const analysis_controller_1 = require("../controllers/analysis.controller");
const router = express_1.default.Router();
// Get user's analysis history
router.get('/history', auth_middleware_1.auth, analysis_controller_1.getAnalysisHistory);
// Create new analysis
router.post('/', auth_middleware_1.auth, analysis_controller_1.createAnalysis);
// Update analysis
router.patch('/:id', auth_middleware_1.auth, analysis_controller_1.updateAnalysis);
// Delete analysis
router.delete('/:id', auth_middleware_1.auth, analysis_controller_1.deleteAnalysis);
exports.default = router;
