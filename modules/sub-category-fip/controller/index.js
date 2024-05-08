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
exports.subCategoryFipRoutes = void 0;
const express_1 = require("express");
const response_handler_1 = require("../../../common/response.handler");
const admin_middleware_1 = require("../../../common/middleware/admin.middleware");
const service_1 = require("../service");
exports.subCategoryFipRoutes = (0, express_1.Router)();
exports.subCategoryFipRoutes.post("/list", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield service_1.subCategoryFipService.getsubCategoryList(req, res);
        (0, response_handler_1.successResponseHandler)(res, data);
    }
    catch (error) {
        (0, response_handler_1.errorResponseHandler)(res, error);
    }
}));
exports.subCategoryFipRoutes.post("/", admin_middleware_1.adminMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield service_1.subCategoryFipService.createSubCategory(req, res);
        (0, response_handler_1.successResponseHandler)(res);
    }
    catch (error) {
        (0, response_handler_1.errorResponseHandler)(res, error);
    }
}));
exports.subCategoryFipRoutes.put("/:id", admin_middleware_1.adminMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield service_1.subCategoryFipService.updatesubCategory(req, res);
        (0, response_handler_1.successResponseHandler)(res, data);
    }
    catch (error) {
        (0, response_handler_1.errorResponseHandler)(res, error);
    }
}));
exports.subCategoryFipRoutes.delete("/:id", admin_middleware_1.adminMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield service_1.subCategoryFipService.deletesubCategory(req, res);
        (0, response_handler_1.successResponseHandler)(res, data);
    }
    catch (error) {
        (0, response_handler_1.errorResponseHandler)(res, error);
    }
}));
exports.subCategoryFipRoutes.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield service_1.subCategoryFipService.getsubCategoryById(req, res);
        (0, response_handler_1.successResponseHandler)(res, data);
    }
    catch (error) {
        (0, response_handler_1.errorResponseHandler)(res, error);
    }
}));
