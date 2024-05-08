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
exports.userRoutes = void 0;
const express_1 = require("express");
const response_handler_1 = require("../../../common/response.handler");
const service_1 = require("../service");
const auth_middleware_1 = require("../../../common/middleware/auth.middleware");
const admin_middleware_1 = require("../../../common/middleware/admin.middleware");
exports.userRoutes = (0, express_1.Router)();
exports.userRoutes.get('/profile', auth_middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield service_1.userService.profile(req, res);
        (0, response_handler_1.successResponseHandler)(res, data);
    }
    catch (error) {
        (0, response_handler_1.errorResponseHandler)(res, error);
    }
}));
exports.userRoutes.get('/list', admin_middleware_1.adminMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield service_1.userService.getUserList(req, res);
        (0, response_handler_1.successResponseHandler)(res, data);
    }
    catch (error) {
        (0, response_handler_1.errorResponseHandler)(res, error);
    }
}));
exports.userRoutes.get('/admin/list', admin_middleware_1.adminMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield service_1.userService.getUsersListForAdmin(req, res);
        (0, response_handler_1.successResponseHandler)(res, data);
    }
    catch (error) {
        (0, response_handler_1.errorResponseHandler)(res, error);
    }
}));
exports.userRoutes.get('/:id', auth_middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield service_1.userService.getUserById(req, res);
        (0, response_handler_1.successResponseHandler)(res, data);
    }
    catch (error) {
        (0, response_handler_1.errorResponseHandler)(res, error);
    }
}));
exports.userRoutes.put('/:id', auth_middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield service_1.userService.updateUser(req, res);
        (0, response_handler_1.successResponseHandler)(res, data);
    }
    catch (error) {
        (0, response_handler_1.errorResponseHandler)(res, error);
    }
}));
exports.userRoutes.put('/block-user/:id', admin_middleware_1.adminMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield service_1.userService.toggleUserBlock(req, res);
        (0, response_handler_1.successResponseHandler)(res, data);
    }
    catch (error) {
        (0, response_handler_1.errorResponseHandler)(res, error);
    }
}));
exports.userRoutes.delete('/:id', admin_middleware_1.adminMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield service_1.userService.deleteUser(req, res);
        (0, response_handler_1.successResponseHandler)(res, data);
    }
    catch (error) {
        (0, response_handler_1.errorResponseHandler)(res, error);
    }
}));
