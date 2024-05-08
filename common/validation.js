"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const customError_1 = require("./customError");
function validateRequest(requestData, schema) {
    const { error, value } = schema.options({ allowUnknown: true }).validate(requestData);
    if (error) {
        throw (0, customError_1.CustomError)(error, 400);
    }
    return value;
}
exports.validateRequest = validateRequest;
