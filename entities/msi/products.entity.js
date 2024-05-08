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
exports.ProductMSI = exports.PRODUCT_TYPE = void 0;
const typeorm_1 = require("typeorm");
const catgeory_entity_1 = require("./catgeory.entity");
const common_entity_1 = require("../common/common.entity");
var PRODUCT_TYPE;
(function (PRODUCT_TYPE) {
    PRODUCT_TYPE["FREE"] = "free";
    PRODUCT_TYPE["PAID"] = "paid";
})(PRODUCT_TYPE || (exports.PRODUCT_TYPE = PRODUCT_TYPE = {}));
let ProductMSI = exports.ProductMSI = class ProductMSI extends common_entity_1.Common {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'integer' }),
    __metadata("design:type", Number)
], ProductMSI.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], ProductMSI.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'longtext', name: 'file_url', nullable: true }),
    __metadata("design:type", String)
], ProductMSI.prototype, "fileUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: PRODUCT_TYPE, default: PRODUCT_TYPE.FREE, name: 'product_type' }),
    __metadata("design:type", String)
], ProductMSI.prototype, "productType", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => catgeory_entity_1.CategoryMSI, (categoryMsi) => categoryMsi.products),
    (0, typeorm_1.JoinColumn)({ name: 'category_msi_id' }),
    __metadata("design:type", catgeory_entity_1.CategoryMSI)
], ProductMSI.prototype, "category", void 0);
exports.ProductMSI = ProductMSI = __decorate([
    (0, typeorm_1.Entity)('products_msi')
], ProductMSI);
