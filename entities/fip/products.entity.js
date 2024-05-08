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
exports.ProductFIP = exports.PRODUCT_TYPE = void 0;
const typeorm_1 = require("typeorm");
const catgeory_entity_1 = require("./catgeory.entity");
const common_entity_1 = require("../common/common.entity");
const sub_category_1 = require("./sub-category");
var PRODUCT_TYPE;
(function (PRODUCT_TYPE) {
    PRODUCT_TYPE["FREE"] = "free";
    PRODUCT_TYPE["PAID"] = "paid";
})(PRODUCT_TYPE || (exports.PRODUCT_TYPE = PRODUCT_TYPE = {}));
let ProductFIP = exports.ProductFIP = class ProductFIP extends common_entity_1.Common {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "integer" }),
    __metadata("design:type", Number)
], ProductFIP.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255 }),
    __metadata("design:type", String)
], ProductFIP.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], ProductFIP.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "numeric" }),
    __metadata("design:type", Number)
], ProductFIP.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "longtext", name: "image_url", nullable: true }),
    __metadata("design:type", String)
], ProductFIP.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: PRODUCT_TYPE,
        default: PRODUCT_TYPE.FREE,
        name: "user_type",
    }),
    __metadata("design:type", String)
], ProductFIP.prototype, "productType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, name: "hsn_code" }),
    __metadata("design:type", String)
], ProductFIP.prototype, "hsnCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, name: "part_number" }),
    __metadata("design:type", String)
], ProductFIP.prototype, "partNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "integer", name: "gst" }),
    __metadata("design:type", Number)
], ProductFIP.prototype, "gst", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => catgeory_entity_1.CategoryFIP, (category) => category.productsFip),
    (0, typeorm_1.JoinColumn)({ name: "category_fip_id" }),
    __metadata("design:type", catgeory_entity_1.CategoryFIP)
], ProductFIP.prototype, "categoryFip", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sub_category_1.SubCategoryFIP, (category) => category.productsFip),
    (0, typeorm_1.JoinColumn)({ name: "subcategory_fip_id" }),
    __metadata("design:type", sub_category_1.SubCategoryFIP)
], ProductFIP.prototype, "subCategoryFip", void 0);
exports.ProductFIP = ProductFIP = __decorate([
    (0, typeorm_1.Entity)("products_fip")
], ProductFIP);
