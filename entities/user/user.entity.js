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
exports.Users = exports.USER_TYPE = void 0;
const typeorm_1 = require("typeorm");
const common_entity_1 = require("../common/common.entity");
const plan_membership_entity_1 = require("../plan/plan-membership.entity");
var USER_TYPE;
(function (USER_TYPE) {
    USER_TYPE["FREE"] = "free";
    USER_TYPE["PAID"] = "paid";
})(USER_TYPE || (exports.USER_TYPE = USER_TYPE = {}));
let Users = exports.Users = class Users extends common_entity_1.Common {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'integer', }),
    __metadata("design:type", Number)
], Users.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Users.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: '12', unique: true }),
    __metadata("design:type", String)
], Users.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: '255', unique: true, nullable: true }),
    __metadata("design:type", String)
], Users.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false, name: 'is_blocked' }),
    __metadata("design:type", Boolean)
], Users.prototype, "isBlocked", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'refresh_token' }),
    __metadata("design:type", String)
], Users.prototype, "refreshToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: USER_TYPE, default: USER_TYPE.FREE, name: 'user_type' }),
    __metadata("design:type", String)
], Users.prototype, "userType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', name: 'image_url', nullable: true }),
    __metadata("design:type", String)
], Users.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => plan_membership_entity_1.PlanMembership, (planMemberships) => planMemberships.user),
    __metadata("design:type", Array)
], Users.prototype, "planMemberships", void 0);
exports.Users = Users = __decorate([
    (0, typeorm_1.Entity)('users')
], Users);
