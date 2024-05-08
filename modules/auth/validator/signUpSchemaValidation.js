"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.signUpSchema = joi_1.default.object({
    name: joi_1.default.string().min(2).required(),
    phone: joi_1.default.string().min(10).required(),
    email: joi_1.default.string().email().optional(),
    otp: joi_1.default.number().required(),
});
