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
exports.PlanMembership = void 0;
const typeorm_1 = require("typeorm");
const common_entity_1 = require("../common/common.entity");
const user_entity_1 = require("../user/user.entity");
const plan_entity_1 = require("./plan.entity");
let PlanMembership = exports.PlanMembership = class PlanMembership extends common_entity_1.Common {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'integer' }),
    __metadata("design:type", Number)
], PlanMembership.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', name: 'is_active', default: true }),
    __metadata("design:type", Boolean)
], PlanMembership.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', name: 'start_date', default: '2023/10/30' }),
    __metadata("design:type", Date)
], PlanMembership.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', name: 'expires_at' }),
    __metadata("design:type", Date)
], PlanMembership.prototype, "expiresAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', name: 'transaction_id' }),
    __metadata("design:type", String)
], PlanMembership.prototype, "transactionId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.Users, (user) => user.planMemberships, { nullable: false, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.Users)
], PlanMembership.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => plan_entity_1.Plan, (plan) => plan.planMemberships, { nullable: false, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'plan_id' }),
    __metadata("design:type", plan_entity_1.Plan)
], PlanMembership.prototype, "plan", void 0);
exports.PlanMembership = PlanMembership = __decorate([
    (0, typeorm_1.Entity)('plan_membership')
], PlanMembership);
