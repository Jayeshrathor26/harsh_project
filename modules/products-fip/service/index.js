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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productService = void 0;
const config_1 = require("../../../config/db/config");
const customError_1 = require("../../../common/customError");
const validation_1 = require("../../../common/validation");
const validator_1 = require("../validator");
const products_entity_1 = require("../../../entities/fip/products.entity");
const pagination_validator_1 = require("../../../common/pagination/pagination.validator");
const typeorm_1 = require("typeorm");
const plan_membership_entity_1 = require("../../../entities/plan/plan-membership.entity");
const xlsx_1 = __importDefault(require("xlsx"));
const fs_1 = __importDefault(require("fs"));
class ProductServiceFip {
    createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const validatedData = (0, validation_1.validateRequest)(req.body, validator_1.createProductSchema);
            const productRepository = config_1.AppDataSource.getRepository(products_entity_1.ProductFIP);
            const productToBeCreated = productRepository.create({
                name: validatedData.name,
                description: validatedData.description,
                imageUrl: validatedData.imageUrl,
                price: validatedData.price,
                categoryFip: { id: validatedData.categoryId },
                subCategoryFip: { id: validatedData.subCategoryId },
                productType: validatedData.productType,
                gst: validatedData.gst,
                hsnCode: validatedData.hsnCode,
                partNumber: validatedData.partNumber,
            });
            const product = yield productRepository.save(productToBeCreated);
            return product;
        });
    }
    updateProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const validatedData = (0, validation_1.validateRequest)(req.body, validator_1.updateProductSchema);
            const productRepository = config_1.AppDataSource.getRepository(products_entity_1.ProductFIP);
            const product = yield productRepository.findOne({
                where: {
                    id: id,
                },
            });
            if (!product) {
                throw (0, customError_1.CustomError)(`Could not find product with id ${id}`, 404);
            }
            product.name = validatedData.name;
            product.description = validatedData.description;
            product.imageUrl = validatedData.imageUrl;
            product.price = validatedData.price;
            product.categoryFip = { id: validatedData.categoryId };
            product.subCategoryFip = { id: validatedData.subCategoryId };
            product.productType = validatedData.productType;
            product.gst = validatedData.gst;
            (product.hsnCode = validatedData.hsnCode),
                (product.partNumber = validatedData.partNumber);
            yield productRepository.save(product);
            return product;
        });
    }
    getProductById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { role } = req.user;
            const productRepository = config_1.AppDataSource.getRepository(products_entity_1.ProductFIP);
            const product = yield productRepository.findOne({
                relations: {
                    categoryFip: true,
                    subCategoryFip: true,
                },
                where: {
                    id: id,
                },
                select: {
                    id: true,
                    categoryFip: {
                        id: true,
                        name: true,
                        description: true,
                    },
                    subCategoryFip: {
                        id: true,
                        name: true,
                        description: true,
                    },
                    description: true,
                    name: true,
                    imageUrl: true,
                    price: true,
                    productType: true,
                    createdAt: true,
                    updatedAt: true,
                    deletedAt: true,
                    hsnCode: true,
                    gst: true,
                    partNumber: true,
                },
            });
            if (!product) {
                throw (0, customError_1.CustomError)(`Could not find product with id ${id}`, 404);
            }
            if (role === "user" && product.productType !== products_entity_1.PRODUCT_TYPE.FREE) {
                const { id: userId } = req.user;
                const planMembershipRepository = config_1.AppDataSource.getRepository(plan_membership_entity_1.PlanMembership);
                const activeMembership = yield planMembershipRepository.exist({
                    where: {
                        user: {
                            id: userId,
                        },
                        isActive: true,
                        expiresAt: (0, typeorm_1.MoreThan)(new Date()),
                    },
                });
                if (!activeMembership) {
                    throw (0, customError_1.CustomError)("You don't have an active plan", 400);
                }
            }
            return product;
        });
    }
    getProductByIdForUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const productRepository = config_1.AppDataSource.getRepository(products_entity_1.ProductFIP);
            const product = yield productRepository.findOne({
                relations: {
                    categoryFip: true,
                    subCategoryFip: true,
                },
                where: {
                    id: id,
                },
                select: {
                    id: true,
                    categoryFip: {
                        id: true,
                        name: true,
                        description: true,
                    },
                    subCategoryFip: {
                        id: true,
                        name: true,
                        description: true,
                    },
                    description: true,
                    name: true,
                    imageUrl: true,
                    price: true,
                    productType: true,
                    createdAt: true,
                    updatedAt: true,
                    deletedAt: true,
                },
            });
            if (!product) {
                throw (0, customError_1.CustomError)(`Could not find product with id ${id}`, 404);
            }
            return product;
        });
    }
    getProductListForUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { limit = 10, page = 1, keyword, } = (0, validation_1.validateRequest)(req.body, pagination_validator_1.paginationSchema);
            const { brandIds, categoryIds, productType, subCategoryIds } = (0, validation_1.validateRequest)(req.body, validator_1.productListSchema);
            const skip = limit * (page - 1);
            const productRepository = config_1.AppDataSource.getRepository(products_entity_1.ProductFIP);
            const where = {};
            if (keyword) {
                where.name = (0, typeorm_1.Like)(`${keyword}%`);
            }
            if (categoryIds) {
                where.categoryFip = { id: (0, typeorm_1.In)(categoryIds) };
            }
            if (subCategoryIds) {
                where.subCategoryFip = { id: (0, typeorm_1.In)(subCategoryIds) };
            }
            if (productType) {
                where.productType = productType;
            }
            const [productList, count] = yield productRepository.findAndCount({
                where,
                order: { productType: "asc", createdAt: "DESC" },
                select: {
                    id: true,
                    name: true,
                    imageUrl: true,
                    productType: true,
                    createdAt: true,
                    updatedAt: true,
                    deletedAt: true,
                },
            });
            return {
                productList,
                count,
            };
        });
    }
    getProductList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { limit = 10, page = 1, keyword, } = (0, validation_1.validateRequest)(req.body, pagination_validator_1.paginationSchema);
            const { brandIds, categoryIds, productType, subCategoryIds } = (0, validation_1.validateRequest)(req.body, validator_1.productListSchema);
            const skip = limit * (page - 1);
            const productRepository = config_1.AppDataSource.getRepository(products_entity_1.ProductFIP);
            const where = {};
            if (keyword) {
                where.name = (0, typeorm_1.Like)(`%${keyword}%`);
            }
            if (categoryIds) {
                where.categoryFip = { id: (0, typeorm_1.In)(categoryIds) };
            }
            if (subCategoryIds) {
                where.subCategoryFip = { id: (0, typeorm_1.In)(subCategoryIds) };
            }
            if (productType) {
                where.productType = productType;
            }
            const [productList, count] = yield productRepository.findAndCount({
                relations: {
                    categoryFip: true,
                    subCategoryFip: true,
                },
                where,
                take: limit,
                skip: skip,
                order: { createdAt: "DESC" },
                select: {
                    id: true,
                    categoryFip: {
                        id: true,
                        name: true,
                        imageUrl: true,
                        description: true,
                    },
                    subCategoryFip: {
                        id: true,
                        name: true,
                        imageUrl: true,
                        description: true,
                    },
                    description: true,
                    name: true,
                    imageUrl: true,
                    price: true,
                    productType: true,
                    createdAt: true,
                    updatedAt: true,
                    deletedAt: true,
                    hsnCode: true,
                    gst: true,
                    partNumber: true,
                },
            });
            return {
                productList,
                count,
            };
        });
    }
    deleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const productRepository = config_1.AppDataSource.getRepository(products_entity_1.ProductFIP);
            const product = yield productRepository.findOne({
                where: {
                    id: id,
                },
            });
            if (!product) {
                throw (0, customError_1.CustomError)(`Could not find product with id ${id}`, 404);
            }
            yield productRepository.remove(product);
            return true;
        });
    }
    bulkInsert(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const productRepository = config_1.AppDataSource.getRepository(products_entity_1.ProductFIP);
            const filePath = req.file.path;
            const workbook = xlsx_1.default.readFile(filePath);
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const data = xlsx_1.default.utils.sheet_to_json(worksheet, { header: 1 });
            const headers = data[0];
            const dataArray = data.slice(1);
            const result = [];
            dataArray.forEach((row) => {
                if (row && row.length > 0) {
                    result.push({
                        name: row[headers.indexOf("name")].toString(),
                        description: row[headers.indexOf("description")].toString(),
                        imageUrl: row[headers.indexOf("imageUrl")],
                        price: Number(row[headers.indexOf("price")]),
                        hsnCode: row[headers.indexOf("hsnCode")].toString(),
                        partNumber: row[headers.indexOf("partNumber")].toString(),
                        gst: Number(row[headers.indexOf("gst")]),
                        productType: row[headers.indexOf("productType")].toString(),
                        categoryId: Number(row[headers.indexOf("categoryId")]),
                        subCategoryId: Number(row[headers.indexOf("subCategoryId")]),
                    });
                }
            });
            // Delete the file
            fs_1.default.unlink(filePath, (err) => {
                if (err) {
                    console.error("Error deleting file:", err);
                }
            });
            const productArray = yield Promise.all(result.map((product) => __awaiter(this, void 0, void 0, function* () {
                const data = yield (0, validation_1.validateRequest)(product, validator_1.createProductSchema);
                const productToBeCreated = productRepository.create(Object.assign(Object.assign({}, data), { categoryFip: {
                        id: data.categoryId,
                    }, subCategoryFip: {
                        id: data.subCategoryId,
                    } }));
                return productToBeCreated;
            })));
            // Process the extracted data here
            yield productRepository.save(productArray);
            return true;
        });
    }
}
exports.productService = new ProductServiceFip();
