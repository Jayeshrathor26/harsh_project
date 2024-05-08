"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPlanMembershipSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createPlanMembershipSchema = joi_1.default.object({
    transactionId: joi_1.default.string().min(1).required(),
    planId: joi_1.default.number().required(),
});
