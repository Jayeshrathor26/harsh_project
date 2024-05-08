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
exports.OTP = void 0;
const typeorm_1 = require("typeorm");
const common_entity_1 = require("../common/common.entity");
let OTP = exports.OTP = class OTP extends common_entity_1.Common {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'integer' }),
    __metadata("design:type", Number)
], OTP.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer' }),
    __metadata("design:type", Number)
], OTP.prototype, "otp", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', name: 'is_active', default: true }),
    __metadata("design:type", Boolean)
], OTP.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', name: 'destination' }),
    __metadata("design:type", String)
], OTP.prototype, "destination", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'expires_at', type: 'timestamp', default: () => "CURRENT_TIMESTAMP + INTERVAL 5 MINUTE" }),
    __metadata("design:type", Date)
], OTP.prototype, "expiresAt", void 0);
exports.OTP = OTP = __decorate([
    (0, typeorm_1.Entity)('otp')
], OTP);
