"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const file_controller_1 = require("../controllers/file.controller");
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
// Configure multer for file upload
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        var _a;
        // Create user-specific directory
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!userId) {
            return cb(new Error('User not authenticated'), '');
        }
        const userDir = path_1.default.join(__dirname, '../../uploads', userId.toString());
        if (!require('fs').existsSync(userDir)) {
            require('fs').mkdirSync(userDir, { recursive: true });
        }
        cb(null, userDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path_1.default.extname(file.originalname));
    }
});
const upload = (0, multer_1.default)({ storage });
// All routes require authentication
router.use(auth_middleware_1.auth);
// Get all files for the authenticated user
router.get('/', file_controller_1.getUserFiles);
// Get file statistics for the authenticated user
router.get('/stats', file_controller_1.getFileStats);
// Get file data for re-analysis
router.get('/:id/data', file_controller_1.getFileData);
// Upload a new file
router.post('/upload', upload.single('file'), file_controller_1.uploadFile);
// Download a file
router.get('/:id/download', file_controller_1.downloadFile);
// Delete a file
router.delete('/:id', file_controller_1.deleteFile);
exports.default = router;
