"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.updateUserSchema = joi_1.default.object({
    name: joi_1.default.string().optional(),
    email: joi_1.default.string().allow('').email().optional(),
    address: joi_1.default.string().allow('').optional(),
    imageUrl: joi_1.default.string().allow(null, '').optional()
});
