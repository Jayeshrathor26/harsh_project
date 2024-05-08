"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subCategoryListSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.subCategoryListSchema = joi_1.default.object({
    categoryIds: joi_1.default.array().optional()
});
