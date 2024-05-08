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
Object.defineProperty(exports, "__esModule", { value: true });
exports.subCategoryRoutes = void 0;
const express_1 = require("express");
const service_1 = require("../service");
const admin_middleware_1 = require("../../../../common/middleware/admin.middleware");
const response_handler_1 = require("../../../../common/response.handler");
exports.subCategoryRoutes = (0, express_1.Router)();
exports.subCategoryRoutes.post("/list", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield service_1.subCategoryService.getsubCategoryList(req, res);
        (0, response_handler_1.successResponseHandler)(res, data);
    }
    catch (error) {
        (0, response_handler_1.errorResponseHandler)(res, error);
    }
}));
exports.subCategoryRoutes.post("/", admin_middleware_1.adminMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield service_1.subCategoryService.createSubCategory(req, res);
        (0, response_handler_1.successResponseHandler)(res);
    }
    catch (error) {
        (0, response_handler_1.errorResponseHandler)(res, error);
    }
}));
exports.subCategoryRoutes.put("/:id", admin_middleware_1.adminMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield service_1.subCategoryService.updatesubCategory(req, res);
        (0, response_handler_1.successResponseHandler)(res, data);
    }
    catch (error) {
        (0, response_handler_1.errorResponseHandler)(res, error);
    }
}));
exports.subCategoryRoutes.delete("/:id", admin_middleware_1.adminMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield service_1.subCategoryService.deletesubCategory(req, res);
        (0, response_handler_1.successResponseHandler)(res, data);
    }
    catch (error) {
        (0, response_handler_1.errorResponseHandler)(res, error);
    }
}));
exports.subCategoryRoutes.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield service_1.subCategoryService.getsubCategoryById(req, res);
        (0, response_handler_1.successResponseHandler)(res, data);
    }
    catch (error) {
        (0, response_handler_1.errorResponseHandler)(res, error);
    }
}));
