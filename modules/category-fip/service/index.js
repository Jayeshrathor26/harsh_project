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
exports.categoryFipService = void 0;
const config_1 = require("../../../config/db/config");
const customError_1 = require("../../../common/customError");
const validation_1 = require("../../../common/validation");
const validator_1 = require("../validator");
const pagination_validator_1 = require("../../../common/pagination/pagination.validator");
const typeorm_1 = require("typeorm");
const catgeory_entity_1 = require("../../../entities/fip/catgeory.entity");
class CategoryFIPService {
    createCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const validatedData = (0, validation_1.validateRequest)(req.body, validator_1.createCategorySchema);
            const categoryRepository = config_1.AppDataSource.getRepository(catgeory_entity_1.CategoryFIP);
            const categoryToBeCreated = categoryRepository.create({
                name: validatedData.name,
                description: validatedData.description,
                imageUrl: validatedData.imageUrl || " ",
            });
            const category = yield categoryRepository.save(categoryToBeCreated);
            return category;
        });
    }
    updateCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const validatedData = (0, validation_1.validateRequest)(req.body, validator_1.updateCategorySchema);
            const categoryRepository = config_1.AppDataSource.getRepository(catgeory_entity_1.CategoryFIP);
            const category = yield categoryRepository.findOne({
                where: {
                    id: id,
                },
            });
            if (!category) {
                throw (0, customError_1.CustomError)(`Could not find category with id ${id}`, 404);
            }
            category.name = validatedData.name;
            category.description = validatedData.description;
            category.imageUrl = validatedData.imageUrl;
            yield categoryRepository.save(category);
            return category;
        });
    }
    deleteCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const categoryRepository = config_1.AppDataSource.getRepository(catgeory_entity_1.CategoryFIP);
            const category = yield categoryRepository.findOne({
                where: {
                    id: id,
                },
            });
            if (!category) {
                throw (0, customError_1.CustomError)(`Could not find category with id ${id}`, 404);
            }
            yield categoryRepository.remove(category);
            return true;
        });
    }
    getCategoryById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const categoryRepository = config_1.AppDataSource.getRepository(catgeory_entity_1.CategoryFIP);
            const category = yield categoryRepository.findOne({
                where: {
                    id: id,
                },
            });
            if (!category) {
                throw (0, customError_1.CustomError)(`Could not find category with id ${id}`, 404);
            }
            return category;
        });
    }
    getCategoryList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { limit = 10, page = 1, keyword = "", } = (0, validation_1.validateRequest)(req.query, pagination_validator_1.paginationSchema);
            const skip = limit * (page - 1);
            const categoryRepository = config_1.AppDataSource.getRepository(catgeory_entity_1.CategoryFIP);
            const where = {};
            if (keyword && keyword !== "") {
                where.name = (0, typeorm_1.Like)(`%${keyword}%`);
            }
            const [categoryList, count] = yield categoryRepository.findAndCount({
                where,
                take: limit,
                skip: skip,
                order: { createdAt: "DESC" },
            });
            return {
                categoryList,
                count,
            };
        });
    }
}
exports.categoryFipService = new CategoryFIPService();
