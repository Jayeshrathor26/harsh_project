"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPlanSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createPlanSchema = joi_1.default.object({
    name: joi_1.default.string().min(1).required(),
    description: joi_1.default.string().allow(null).default('').optional(),
    price: joi_1.default.number().required(),
    expiresIn: joi_1.default.number().min(1).required()
});
