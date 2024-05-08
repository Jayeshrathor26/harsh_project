"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productListSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const products_entity_1 = require("../../../../entities/product/products.entity");
exports.productListSchema = joi_1.default.object({
    categoryIds: joi_1.default.array().optional(),
    brandIds: joi_1.default.array().optional(),
    subCategoryIds: joi_1.default.array().optional(),
    productType: joi_1.default.string()
        .valid(...Object.values(products_entity_1.PRODUCT_TYPE))
        .optional(),
});
