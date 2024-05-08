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
exports.planMembershipRoutes = void 0;
const express_1 = require("express");
const response_handler_1 = require("../../../common/response.handler");
const service_1 = require("../service");
const auth_middleware_1 = require("../../../common/middleware/auth.middleware");
const admin_middleware_1 = require("../../../common/middleware/admin.middleware");
exports.planMembershipRoutes = (0, express_1.Router)();
exports.planMembershipRoutes.get('/user/active-membership', auth_middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield service_1.planMembershipService.userActiveMembership(req, res);
        (0, response_handler_1.successResponseHandler)(res, data);
    }
    catch (error) {
        (0, response_handler_1.errorResponseHandler)(res, error);
    }
}));
exports.planMembershipRoutes.get('/user/:id/list', auth_middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield service_1.planMembershipService.userMembershipList(req, res);
        (0, response_handler_1.successResponseHandler)(res, data);
    }
    catch (error) {
        (0, response_handler_1.errorResponseHandler)(res, error);
    }
}));
exports.planMembershipRoutes.get('/list', admin_middleware_1.adminMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield service_1.planMembershipService.getPlanMembershipList(req, res);
        (0, response_handler_1.successResponseHandler)(res, data);
    }
    catch (error) {
        (0, response_handler_1.errorResponseHandler)(res, error);
    }
}));
exports.planMembershipRoutes.post('/user/membership', auth_middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield service_1.planMembershipService.createPlanMembership(req, res);
        (0, response_handler_1.successResponseHandler)(res);
    }
    catch (error) {
        (0, response_handler_1.errorResponseHandler)(res, error);
    }
}));
exports.planMembershipRoutes.post('/admin/membership/:userId', admin_middleware_1.adminMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield service_1.planMembershipService.createPlanMembershipThroughAdmin(req, res);
        (0, response_handler_1.successResponseHandler)(res);
    }
    catch (error) {
        (0, response_handler_1.errorResponseHandler)(res, error);
    }
}));
exports.planMembershipRoutes.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield service_1.planMembershipService.updatePlan(req, res);
        (0, response_handler_1.successResponseHandler)(res, data);
    }
    catch (error) {
        (0, response_handler_1.errorResponseHandler)(res, error);
    }
}));
exports.planMembershipRoutes.delete('/:id', admin_middleware_1.adminMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield service_1.planMembershipService.deletePlanMembership(req, res);
        (0, response_handler_1.successResponseHandler)(res, data);
    }
    catch (error) {
        (0, response_handler_1.errorResponseHandler)(res, error);
    }
}));
exports.planMembershipRoutes.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield service_1.planMembershipService.getPlanById(req, res);
        (0, response_handler_1.successResponseHandler)(res, data);
    }
    catch (error) {
        (0, response_handler_1.errorResponseHandler)(res, error);
    }
}));
