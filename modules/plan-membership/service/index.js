"use strict";
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
exports.planMembershipService = void 0;
const config_1 = require("../../../config/db/config");
const customError_1 = require("../../../common/customError");
const validation_1 = require("../../../common/validation");
const plan_entity_1 = require("../../../entities/plan/plan.entity");
const pagination_validator_1 = require("../../../common/pagination/pagination.validator");
const plan_membership_entity_1 = require("../../../entities/plan/plan-membership.entity");
const typeorm_1 = require("typeorm");
const validator_1 = require("../validator");
const user_entity_1 = require("../../../entities/user/user.entity");
const service_1 = require("../../notification/service");
class PlanMembershipService {
    createPlanMembership(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: userId } = req.user;
            const validatedData = (0, validation_1.validateRequest)(req.body, validator_1.createPlanMembershipSchema);
            const planMembershipRepository = config_1.AppDataSource.getRepository(plan_membership_entity_1.PlanMembership);
            const userRepository = config_1.AppDataSource.getRepository(user_entity_1.Users);
            const planRepository = config_1.AppDataSource.getRepository(plan_entity_1.Plan);
            const plan = yield planRepository.findOne({
                where: {
                    id: validatedData.planId
                }
            });
            const user = yield userRepository.findOne({
                where: {
                    id: userId
                }
            });
            if (!plan) {
                throw (0, customError_1.CustomError)(`Could not find plan with id ${validatedData.planId}`, 404);
            }
            const activeMembership = yield planMembershipRepository.findOne({
                relations: {
                    plan: true,
                },
                where: {
                    user: {
                        id: userId
                    },
                    isActive: true,
                    expiresAt: (0, typeorm_1.MoreThan)(new Date()),
                },
                select: {
                    id: true,
                    expiresAt: true
                }, order: {
                    expiresAt: 'DESC'
                }
            });
            let startDate = new Date();
            let expiresAt = new Date(new Date().getTime() + (plan.expiresIn * 24 * 60 * 60 * 1000));
            if (activeMembership) {
                startDate = activeMembership.expiresAt;
                expiresAt = new Date(new Date(activeMembership.expiresAt).getTime() + (plan.expiresIn * 24 * 60 * 60 * 1000));
            }
            const planMembershipToBeCreated = planMembershipRepository.create({
                user: { id: userId }, plan: {
                    id: validatedData.planId
                },
                transactionId: validatedData.transactionId,
                startDate,
                expiresAt
            });
            yield planMembershipRepository.save(planMembershipToBeCreated);
            user.userType = user_entity_1.USER_TYPE.PAID;
            yield userRepository.save(user);
            const userActiveMembership = yield this.userActiveMembership(req, res);
            yield service_1.notificationService.addNotification({ title: `User with Phone : ${user.phone} Bought a new membership`, path: `/memberships` });
            return userActiveMembership;
        });
    }
    createPlanMembershipThroughAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.params;
            const validatedData = (0, validation_1.validateRequest)(req.body, validator_1.createPlanMembershipSchema);
            const planMembershipRepository = config_1.AppDataSource.getRepository(plan_membership_entity_1.PlanMembership);
            const userRepository = config_1.AppDataSource.getRepository(user_entity_1.Users);
            const planRepository = config_1.AppDataSource.getRepository(plan_entity_1.Plan);
            const plan = yield planRepository.findOne({
                where: {
                    id: validatedData.planId
                }
            });
            const user = yield userRepository.findOne({
                where: {
                    id: userId
                }
            });
            if (!plan) {
                throw (0, customError_1.CustomError)(`Could not find plan with id ${validatedData.planId}`, 404);
            }
            const activeMembership = yield planMembershipRepository.findOne({
                relations: {
                    plan: true,
                },
                where: {
                    user: {
                        id: userId
                    },
                    isActive: true,
                    expiresAt: (0, typeorm_1.MoreThan)(new Date()),
                },
                select: {
                    id: true,
                    expiresAt: true
                }, order: {
                    expiresAt: 'DESC'
                }
            });
            let startDate = new Date();
            let expiresAt = new Date(new Date().getTime() + (plan.expiresIn * 24 * 60 * 60 * 1000));
            if (activeMembership) {
                startDate = activeMembership.expiresAt;
                expiresAt = new Date(new Date(activeMembership.expiresAt).getTime() + (plan.expiresIn * 24 * 60 * 60 * 1000));
            }
            const planMembershipToBeCreated = planMembershipRepository.create({
                user: { id: userId }, plan: {
                    id: validatedData.planId
                },
                transactionId: validatedData.transactionId,
                startDate,
                expiresAt
            });
            yield planMembershipRepository.save(planMembershipToBeCreated);
            user.userType = user_entity_1.USER_TYPE.PAID;
            yield userRepository.save(user);
            const userActiveMembership = this.userActiveMembership(req, res);
            return userActiveMembership;
        });
    }
    updatePlan(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const validatedData = (0, validation_1.validateRequest)(req.body, validator_1.createPlanMembershipSchema);
            const planRepository = config_1.AppDataSource.getRepository(plan_entity_1.Plan);
            const plan = yield planRepository.findOne({
                where: {
                    id: id,
                }
            });
            if (plan) {
                throw (0, customError_1.CustomError)(`Could not find plan with id ${id}`, 404);
            }
            plan.name = validatedData.name;
            plan.expiresIn = validatedData.expiresIn;
            yield planRepository.save(plan);
            return plan;
        });
    }
    deletePlanMembership(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const planMembershipRepository = config_1.AppDataSource.getRepository(plan_membership_entity_1.PlanMembership);
            const planMembership = yield planMembershipRepository.findOne({
                where: {
                    id: id,
                }
            });
            if (!planMembership) {
                throw (0, customError_1.CustomError)(`Could not find planMembership with id ${id}`, 404);
            }
            yield planMembershipRepository.remove(planMembership);
            return true;
        });
    }
    getPlanById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const planRepository = config_1.AppDataSource.getRepository(plan_entity_1.Plan);
            const plan = yield planRepository.findOne({
                where: {
                    id: id,
                }
            });
            if (plan) {
                throw (0, customError_1.CustomError)(`Could not find plan with id ${id}`, 404);
            }
            return plan;
        });
    }
    getPlanMembershipList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { limit = 10, page = 1, keyword = '' } = (0, validation_1.validateRequest)(req.query, pagination_validator_1.paginationSchema);
            const skip = limit * (page - 1);
            const planMembershipRepository = config_1.AppDataSource.getRepository(plan_membership_entity_1.PlanMembership);
            const whereCondition = [];
            if (keyword && keyword !== '') {
                whereCondition.push({
                    user: {
                        name: (0, typeorm_1.Like)(`%${keyword}%`)
                    }
                });
                whereCondition.push({
                    plan: {
                        name: (0, typeorm_1.Like)(`%${keyword}%`)
                    }
                });
            }
            const [planMembershipList, count] = yield planMembershipRepository.findAndCount({
                relations: {
                    user: true,
                    plan: true,
                },
                where: whereCondition,
                order: { createdAt: 'DESC' },
                select: {
                    id: true,
                    createdAt: true,
                    expiresAt: true,
                    transactionId: true,
                    startDate: true,
                    plan: {
                        id: true,
                        name: true,
                        price: true,
                    }, user: {
                        id: true,
                        name: true, imageUrl: true, phone: true
                    }
                },
                take: limit,
                skip: skip
            });
            return {
                planMembershipList, count
            };
        });
    }
    userActiveMembership(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: userId } = req.user;
            const planMembershipRepository = config_1.AppDataSource.getRepository(plan_membership_entity_1.PlanMembership);
            const activeMembership = yield planMembershipRepository.findOne({
                relations: {
                    plan: true,
                },
                where: {
                    user: {
                        id: userId
                    },
                    isActive: true,
                    startDate: (0, typeorm_1.LessThan)(new Date()),
                    expiresAt: (0, typeorm_1.MoreThan)(new Date()),
                },
                select: {
                    id: true,
                    expiresAt: true,
                    createdAt: true,
                    plan: {
                        id: true,
                        name: true,
                        isActive: true, expiresIn: true
                    },
                }
            });
            return activeMembership;
        });
    }
    userMembershipList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: userId } = req.params;
            const { filterName } = req.query;
            let filter;
            if (filterName === 'future_memberships') {
                filter = {
                    startDate: (0, typeorm_1.MoreThan)(new Date()),
                };
            }
            const planMembershipRepository = config_1.AppDataSource.getRepository(plan_membership_entity_1.PlanMembership);
            const [memberships, count] = yield planMembershipRepository.findAndCount({
                relations: {
                    plan: true,
                },
                where: Object.assign({ user: {
                        id: userId
                    } }, filter),
                select: {
                    id: true,
                    expiresAt: true,
                    isActive: true, transactionId: true, createdAt: true,
                    startDate: true,
                    plan: {
                        id: true,
                        name: true,
                        isActive: true, expiresIn: true
                    },
                }, order: {
                    createdAt: 'DESC'
                }
            });
            return {
                membershipList: memberships,
                count: count
            };
        });
    }
}
exports.planMembershipService = new PlanMembershipService();
