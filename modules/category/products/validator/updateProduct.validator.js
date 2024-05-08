"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const products_entity_1 = require("../../../../entities/product/products.entity");
exports.updateProductSchema = joi_1.default.object({
    name: joi_1.default.string().min(1).optional(),
    description: joi_1.default.string().min(1).optional(),
    imageUrl: joi_1.default.string().min(1).optional(),
    price: joi_1.default.number().optional(),
    hsnCode: joi_1.default.string().allow(null).min(1).optional(),
    partNumber: joi_1.default.string().allow(null).min(1).optional(),
    gst: joi_1.default.number().allow(null).optional(),
    categoryId: joi_1.default.number().optional(),
    brandId: joi_1.default.number().optional(),
    subCategoryId: joi_1.default.number().required(),
    productType: joi_1.default.string()
        .valid(...Object.values(products_entity_1.PRODUCT_TYPE))
        .required(),
});
