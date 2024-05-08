"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = exports.PRODUCT_TYPE = void 0;
const typeorm_1 = require("typeorm");
const catgeory_entity_1 = require("./catgeory.entity");
const common_entity_1 = require("../common/common.entity");
const brand_entity_1 = require("./brand.entity");
const sub_category_1 = require("./sub-category");
var PRODUCT_TYPE;
(function (PRODUCT_TYPE) {
    PRODUCT_TYPE["FREE"] = "free";
    PRODUCT_TYPE["PAID"] = "paid";
})(PRODUCT_TYPE || (exports.PRODUCT_TYPE = PRODUCT_TYPE = {}));
let Product = exports.Product = class Product extends common_entity_1.Common {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'integer' }),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric' }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'longtext', name: 'image_url', nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: PRODUCT_TYPE, default: PRODUCT_TYPE.FREE, name: 'user_type' }),
    __metadata("design:type", String)
], Product.prototype, "productType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, name: 'hsn_code' }),
    __metadata("design:type", String)
], Product.prototype, "hsnCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, name: 'part_number' }),
    __metadata("design:type", String)
], Product.prototype, "partNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', name: 'gst' }),
    __metadata("design:type", Number)
], Product.prototype, "gst", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => catgeory_entity_1.Category, (category) => category.products),
    (0, typeorm_1.JoinColumn)({ name: 'category_id' }),
    __metadata("design:type", catgeory_entity_1.Category)
], Product.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sub_category_1.SubCategory, (category) => category.products),
    (0, typeorm_1.JoinColumn)({ name: 'subcategory_id' }),
    __metadata("design:type", sub_category_1.SubCategory)
], Product.prototype, "subCategory", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => brand_entity_1.Brand, (brand) => brand.products),
    (0, typeorm_1.JoinColumn)({ name: 'brand_id' }),
    __metadata("design:type", brand_entity_1.Brand)
], Product.prototype, "brand", void 0);
exports.Product = Product = __decorate([
    (0, typeorm_1.Entity)('products')
], Product);
