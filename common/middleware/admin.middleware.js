"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.adminMiddleware = void 0;
const customError_1 = require("../customError");
const response_handler_1 = require("../response.handler");
const jwt = __importStar(require("jsonwebtoken"));
// Authentication middleware
const adminMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try { // Get the token from the request headers
        const authHeader = req.headers.authorization;
        // Check if token exists
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw (0, customError_1.CustomError)('Invalid token', 401);
        }
        // Extract the token from the Authorization header
        const token = authHeader.split(' ')[1];
        // Verify the token and decode the payload
        const decoded = yield jwt.verify(token, process.env.JWT_SECRET);
        const { role } = decoded;
        if (role !== "admin") {
            throw (0, customError_1.CustomError)('You are not authorized to perform this action', 401);
        }
        // Attach the decoded payload to the request object
        req.user = decoded;
        // Continue to the next middleware or route handler
        next();
    }
    catch (error) {
        (0, response_handler_1.errorResponseHandler)(res, error, 401);
    }
});
exports.adminMiddleware = adminMiddleware;
