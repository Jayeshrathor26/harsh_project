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
exports.productFipRoutes = void 0;
const express_1 = require("express");
const response_handler_1 = require("../../../common/response.handler");
const service_1 = require("../service");
const auth_middleware_1 = require("../../../common/middleware/auth.middleware");
const multer_1 = __importDefault(require("multer"));
exports.productFipRoutes = (0, express_1.Router)();
const upload = (0, multer_1.default)({ dest: "public/excel" });
exports.productFipRoutes.post("/bulk-insert", upload.single("file"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield service_1.productService.bulkInsert(req, res);
        (0, response_handler_1.successResponseHandler)(res, data);
    }
    catch (error) {
        (0, response_handler_1.errorResponseHandler)(res, error, error.statusCode);
    }
}));
exports.productFipRoutes.post("/user/list", auth_middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield service_1.productService.getProductListForUser(req, res);
        (0, response_handler_1.successResponseHandler)(res, data);
    }
    catch (error) {
        (0, response_handler_1.errorResponseHandler)(res, error, error.statusCode);
    }
}));
exports.productFipRoutes.post("/list", auth_middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield service_1.productService.getProductList(req, res);
        (0, response_handler_1.successResponseHandler)(res, data);
    }
    catch (error) {
        (0, response_handler_1.errorResponseHandler)(res, error, error.statusCode);
    }
}));
exports.productFipRoutes.post("/", auth_middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield service_1.productService.createProduct(req, res);
        (0, response_handler_1.successResponseHandler)(res);
    }
    catch (error) {
        (0, response_handler_1.errorResponseHandler)(res, error);
    }
}));
exports.productFipRoutes.put("/:id", auth_middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield service_1.productService.updateProduct(req, res);
        (0, response_handler_1.successResponseHandler)(res, data);
    }
    catch (error) {
        (0, response_handler_1.errorResponseHandler)(res, error);
    }
}));
exports.productFipRoutes.delete("/:id", auth_middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield service_1.productService.deleteProduct(req, res);
        (0, response_handler_1.successResponseHandler)(res, data);
    }
    catch (error) {
        (0, response_handler_1.errorResponseHandler)(res, error);
    }
}));
exports.productFipRoutes.get("/:id", auth_middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield service_1.productService.getProductById(req, res);
        (0, response_handler_1.successResponseHandler)(res, data);
    }
    catch (error) {
        (0, response_handler_1.errorResponseHandler)(res, error);
    }
}));
