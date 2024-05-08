"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCategorySchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.updateCategorySchema = joi_1.default.object({
    name: joi_1.default.string().min(1).optional(),
    description: joi_1.default.string().min(1).optional(),
    imageUrl: joi_1.default.string().min(1).optional(),
}).options({ allowUnknown: true });
;
