"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.paginationSchema = joi_1.default.object({
    limit: joi_1.default.number().default(10).optional(),
    page: joi_1.default.number().default(1).optional(),
    keyword: joi_1.default.string().allow('').optional(),
});
