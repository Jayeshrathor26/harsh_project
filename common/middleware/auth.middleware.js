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
exports.authMiddleware = void 0;
const customError_1 = require("../customError");
const response_handler_1 = require("../response.handler");
const jwt = require('jsonwebtoken');
// Authentication middleware
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        // Attach the decoded payload to the request object
        req.user = decoded;
        // Continue to the next middleware or route handler
        next();
    }
    catch (error) {
        (0, response_handler_1.errorResponseHandler)(res, error, 401);
    }
});
exports.authMiddleware = authMiddleware;
