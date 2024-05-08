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
exports.planService = void 0;
const config_1 = require("../../../config/db/config");
const customError_1 = require("../../../common/customError");
const validation_1 = require("../../../common/validation");
const validator_1 = require("../validator");
const plan_entity_1 = require("../../../entities/plan/plan.entity");
const pagination_validator_1 = require("../../../common/pagination/pagination.validator");
const typeorm_1 = require("typeorm");
class PlanService {
    createPlan(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const validatedData = (0, validation_1.validateRequest)(req.body, validator_1.createPlanSchema);
            const planRepository = config_1.AppDataSource.getRepository(plan_entity_1.Plan);
            const planToBeCreated = planRepository.create({
                name: validatedData.name,
                expiresIn: validatedData.expiresIn,
                description: validatedData.description,
                price: validatedData.price
            });
            const plan = yield planRepository.save(planToBeCreated);
            return plan;
        });
    }
    updatePlan(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const validatedData = (0, validation_1.validateRequest)(req.body, validator_1.updatePlanSchema);
            const planRepository = config_1.AppDataSource.getRepository(plan_entity_1.Plan);
            const plan = yield planRepository.findOne({
                where: {
                    id: id,
                }
            });
            if (!plan) {
                throw (0, customError_1.CustomError)(`Could not find plan with id ${id}`, 404);
            }
            plan.name = validatedData.name;
            plan.expiresIn = validatedData.expiresIn;
            plan.price = validatedData.price;
            plan.description = validatedData.description;
            yield planRepository.save(plan);
            return plan;
        });
    }
    deletePlan(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const planRepository = config_1.AppDataSource.getRepository(plan_entity_1.Plan);
            const plan = yield planRepository.findOne({
                where: {
                    id: id,
                }
            });
            if (!plan) {
                throw (0, customError_1.CustomError)(`Could not find plan with id ${id}`, 404);
            }
            yield planRepository.remove(plan);
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
            if (!plan) {
                throw (0, customError_1.CustomError)(`Could not find plan with id ${id}`, 404);
            }
            return plan;
        });
    }
    getPlanList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { limit = 10, page = 1, keyword = '' } = (0, validation_1.validateRequest)(req.query, pagination_validator_1.paginationSchema);
            const skip = limit * (page - 1);
            const planRepository = config_1.AppDataSource.getRepository(plan_entity_1.Plan);
            const where = {};
            if (keyword && keyword !== '') {
                where.name = (0, typeorm_1.Like)(`%${keyword}%`);
            }
            const [planList, count] = yield planRepository.findAndCount({
                where,
                order: { createdAt: 'DESC' }
            });
            return {
                planList, count
            };
        });
    }
}
exports.planService = new PlanService();
