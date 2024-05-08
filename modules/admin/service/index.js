"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminService = void 0;
const config_1 = require("../../../config/db/config");
const jwt = __importStar(require("jsonwebtoken"));
const customError_1 = require("../../../common/customError");
const validation_1 = require("../../../common/validation");
const loginSchema_validator_1 = require("../validator/loginSchema.validator");
const admin_entity_1 = require("../../../entities/user/admin.entity");
const products_entity_1 = require("../../../entities/fip/products.entity");
const change_password_validator_1 = require("../validator/change-password.validator");
const products_entity_2 = require("../../../entities/product/products.entity");
const user_entity_1 = require("../../../entities/user/user.entity");
const plan_membership_entity_1 = require("../../../entities/plan/plan-membership.entity");
const typeorm_1 = require("typeorm");
class AdminService {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const validatedData = (0, validation_1.validateRequest)(req.body, loginSchema_validator_1.loginSchema);
            const adminRepository = config_1.AppDataSource.getRepository(admin_entity_1.Admin);
            const adminExist = yield adminRepository.findOne({
                where: {
                    email: validatedData.email,
                    password: validatedData.password,
                }
            });
            if (!adminExist) {
                throw (0, customError_1.CustomError)("Invalid Credentials", 401);
            }
            const payload = { email: validatedData.email, id: adminExist.id, role: 'admin' };
            const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
            const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' });
            return { jwt: jwtToken, refreshToken: refreshToken };
        });
    }
    changePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.user;
            const validatedData = (0, validation_1.validateRequest)(req.body, change_password_validator_1.changePasswordSchema);
            const adminRepository = config_1.AppDataSource.getRepository(admin_entity_1.Admin);
            const adminExist = yield adminRepository.findOne({
                where: {
                    id,
                }
            });
            if (!adminExist) {
                throw (0, customError_1.CustomError)("Invalid Credentials", 401);
            }
            if (adminExist.password !== validatedData.currentPassword) {
                throw (0, customError_1.CustomError)("Invalid Credentials", 401);
            }
            adminExist.password = validatedData.newPassword;
            yield adminRepository.save(adminExist);
            return true;
        });
    }
    dashBoardData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const productRepository = config_1.AppDataSource.getRepository(products_entity_2.Product);
            const productfipRepository = config_1.AppDataSource.getRepository(products_entity_1.ProductFIP);
            const planMembershipRepository = config_1.AppDataSource.getRepository(plan_membership_entity_1.PlanMembership);
            const userRepository = config_1.AppDataSource.getRepository(user_entity_1.Users);
            const activeMembership = yield planMembershipRepository.count({
                relations: {
                    plan: true,
                },
                where: {
                    isActive: true,
                    expiresAt: (0, typeorm_1.MoreThan)(new Date()),
                },
            });
            const userCount = yield userRepository.count();
            const productCount = yield productRepository.count();
            const productfipCount = yield productfipRepository.count();
            return {
                activeMembership,
                productCount,
                freeUser: userCount,
                productfipCount
            };
        });
    }
}
exports.adminService = new AdminService();
