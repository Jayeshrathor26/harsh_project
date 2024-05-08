"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOTPSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.verifyOTPSchema = joi_1.default.object({
    phone: joi_1.default.string().min(10).required(),
    otp: joi_1.default.number().required(),
});
