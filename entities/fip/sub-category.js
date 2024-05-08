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
exports.SubCategoryFIP = void 0;
const typeorm_1 = require("typeorm");
const common_entity_1 = require("../common/common.entity");
const products_entity_1 = require("./products.entity");
const catgeory_entity_1 = require("./catgeory.entity");
let SubCategoryFIP = exports.SubCategoryFIP = class SubCategoryFIP extends common_entity_1.Common {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "integer" }),
    __metadata("design:type", Number)
], SubCategoryFIP.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255 }),
    __metadata("design:type", String)
], SubCategoryFIP.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], SubCategoryFIP.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "longtext", name: "image_url", nullable: true }),
    __metadata("design:type", String)
], SubCategoryFIP.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => catgeory_entity_1.CategoryFIP, (category) => category.subCategoriesFip),
    (0, typeorm_1.JoinColumn)({ name: "category_id" }),
    __metadata("design:type", catgeory_entity_1.CategoryFIP)
], SubCategoryFIP.prototype, "categoryFip", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => products_entity_1.ProductFIP, (product) => product.subCategoryFip),
    __metadata("design:type", Array)
], SubCategoryFIP.prototype, "productsFip", void 0);
exports.SubCategoryFIP = SubCategoryFIP = __decorate([
    (0, typeorm_1.Entity)("sub_category_fip")
], SubCategoryFIP);
