"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProductSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const products_entity_1 = require("../../../entities/product/products.entity");
exports.createProductSchema = joi_1.default.object({
    name: joi_1.default.string().min(1).required(),
    description: joi_1.default.string().min(1).optional(),
    imageUrl: joi_1.default.string().min(1).optional(),
    price: joi_1.default.number().required(),
    hsnCode: joi_1.default.string().allow(null, "").default("").min(1).optional(),
    partNumber: joi_1.default.string().allow(null, "").default("").min(1).optional(),
    gst: joi_1.default.number().default(0).required(),
    productType: joi_1.default.string()
        .valid(...Object.values(products_entity_1.PRODUCT_TYPE))
        .required(),
    categoryId: joi_1.default.number().required(),
    subCategoryId: joi_1.default.number().required(),
});
