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
exports.subCategoryFipService = void 0;
const config_1 = require("../../../config/db/config");
const customError_1 = require("../../../common/customError");
const validation_1 = require("../../../common/validation");
const pagination_validator_1 = require("../../../common/pagination/pagination.validator");
const typeorm_1 = require("typeorm");
const validator_1 = require("../validator");
const subCategoryList_validator_1 = require("../validator/subCategoryList.validator");
const sub_category_1 = require("../../../entities/fip/sub-category");
class SubCategoryFipService {
    createSubCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const validatedData = (0, validation_1.validateRequest)(req.body, validator_1.createSubCategorySchema);
            const subCategoryRepository = config_1.AppDataSource.getRepository(sub_category_1.SubCategoryFIP);
            const subCategoryToBeCreated = subCategoryRepository.create({
                name: validatedData.name,
                description: validatedData.description,
                imageUrl: validatedData.imageUrl || " ",
                categoryFip: { id: validatedData.categoryId },
            });
            const subCategory = yield subCategoryRepository.save(subCategoryToBeCreated);
            return subCategory;
        });
    }
    updatesubCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const validatedData = (0, validation_1.validateRequest)(req.body, validator_1.updateSubCategorySchema);
            const subCategoryRepository = config_1.AppDataSource.getRepository(sub_category_1.SubCategoryFIP);
            const subCategory = yield subCategoryRepository.findOne({
                where: {
                    id: id,
                },
            });
            if (!subCategory) {
                throw (0, customError_1.CustomError)(`Could not find subCategory with id ${id}`, 404);
            }
            subCategory.name = validatedData.name;
            subCategory.description = validatedData.description;
            subCategory.imageUrl = validatedData.imageUrl;
            yield subCategoryRepository.save(subCategory);
            return subCategory;
        });
    }
    deletesubCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const subCategoryRepository = config_1.AppDataSource.getRepository(sub_category_1.SubCategoryFIP);
            const subCategory = yield subCategoryRepository.findOne({
                where: {
                    id: id,
                },
            });
            if (!subCategory) {
                throw (0, customError_1.CustomError)(`Could not find subCategory with id ${id}`, 404);
            }
            yield subCategoryRepository.remove(subCategory);
            return true;
        });
    }
    getsubCategoryById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const subCategoryRepository = config_1.AppDataSource.getRepository(sub_category_1.SubCategoryFIP);
            const subCategory = yield subCategoryRepository.findOne({
                where: {
                    id: id,
                },
            });
            if (!subCategory) {
                throw (0, customError_1.CustomError)(`Could not find subCategory with id ${id}`, 404);
            }
            return subCategory;
        });
    }
    getsubCategoryList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { limit = 10, page = 1, keyword = "", } = (0, validation_1.validateRequest)(req.body, pagination_validator_1.paginationSchema);
            const skip = limit * (page - 1);
            const { categoryIds } = (0, validation_1.validateRequest)(req.body, subCategoryList_validator_1.subCategoryListSchema);
            const subCategoryRepository = config_1.AppDataSource.getRepository(sub_category_1.SubCategoryFIP);
            const where = {};
            if (keyword && keyword !== "") {
                where.name = (0, typeorm_1.Like)(`%${keyword}%`);
            }
            if (categoryIds) {
                where.categoryFip = { id: (0, typeorm_1.In)(categoryIds) };
            }
            const [subCategoryList, count] = yield subCategoryRepository.findAndCount({
                relations: {
                    categoryFip: true,
                },
                where,
                take: limit,
                skip: skip,
                select: {
                    categoryFip: {
                        id: true,
                        name: true,
                        description: true,
                    },
                },
                order: { createdAt: "DESC" },
            });
            return {
                subCategoryList,
                count,
            };
        });
    }
}
exports.subCategoryFipService = new SubCategoryFipService();
