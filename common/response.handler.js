"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponseHandler = exports.successResponseHandler = void 0;
const successResponseHandler = (res, data = null, status = 200) => {
    res.status(status).json({
        success: true,
        data: data,
        error: null
    });
};
exports.successResponseHandler = successResponseHandler;
const errorResponseHandler = (res, error, status = 500) => {
    console.log(error);
    res.status(error.statusCode || status).json({
        success: false,
        data: null,
        error: error.message || 'Internal Server Error',
    });
};
exports.errorResponseHandler = errorResponseHandler;
