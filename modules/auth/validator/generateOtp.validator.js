"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOTPSchema = exports.OperationType = void 0;
const joi_1 = __importDefault(require("joi"));
var OperationType;
(function (OperationType) {
    OperationType["SIGN_UP"] = "signup";
    OperationType["LOGIN"] = "login";
})(OperationType || (exports.OperationType = OperationType = {}));
exports.generateOTPSchema = joi_1.default.object({
    phone: joi_1.default.string().min(10).required(),
    operationType: joi_1.default.string().valid(...Object.values(OperationType)).required()
});
