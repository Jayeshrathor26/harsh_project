"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePlanSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.updatePlanSchema = joi_1.default.object({
    name: joi_1.default.string().min(10).optional(),
    expiresIn: joi_1.default.number().min(1).optional()
});
