"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSubCategorySchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createSubCategorySchema = joi_1.default.object({
    name: joi_1.default.string().min(1).required(),
    description: joi_1.default.string().min(1).optional(),
    imageUrl: joi_1.default.string().optional(),
    categoryId: joi_1.default.number().required(),
}).options({ allowUnknown: true });
