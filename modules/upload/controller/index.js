"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadRoutes = void 0;
const express_1 = require("express");
const response_handler_1 = require("../../../common/response.handler");
const service_1 = require("../service");
const auth_middleware_1 = require("../../../common/middleware/auth.middleware");
const multer_1 = __importDefault(require("multer"));
const customError_1 = require("../../../common/customError");
const fileFilter = (req, file, cb) => {
    // Check the file size and type here
    const maxSize = 6 * 1024 * 1024; // 6MB
    const allowedTypes = ['image/jpeg', 'image/png', 'application/octet-stream', 'image/webp', 'image/gif', 'image/svg+xml', 'application/pdf']; // Allowed file types
    if (file.size > maxSize) {
        cb(new Error('File size exceeds the maximum limit'));
    }
    else if (!allowedTypes.includes(file.mimetype)) {
        cb(new Error('Invalid file type'));
    }
    else {
        cb(null, true); // Accept the file
    }
};
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        var _a;
        const folderName = (_a = req.query) === null || _a === void 0 ? void 0 : _a.type;
        if (!folderName) {
            (0, customError_1.CustomError)('Invalid folder name', 400);
        }
        cb(null, `public/${folderName}`);
    },
    filename: function (req, file, cb) {
        const fileName = Date.now() + '-' + file.originalname.replace(/\s/g, "");
        cb(null, fileName);
    }
});
const upload = (0, multer_1.default)({ storage: storage, fileFilter: fileFilter });
exports.uploadRoutes = (0, express_1.Router)();
exports.uploadRoutes.post('/upload', auth_middleware_1.authMiddleware, upload.single('file'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield service_1.uploadService.upload(req, res);
        (0, response_handler_1.successResponseHandler)(res, data);
    }
    catch (error) {
        (0, response_handler_1.errorResponseHandler)(res, error);
    }
}));
