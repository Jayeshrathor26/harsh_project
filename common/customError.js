"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
function CustomError(message, statusCode = 500) {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
}
exports.CustomError = CustomError;
