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
exports.userService = void 0;
const config_1 = require("../../../config/db/config");
const customError_1 = require("../../../common/customError");
const user_entity_1 = require("../../../entities/user/user.entity");
const validation_1 = require("../../../common/validation");
const pagination_validator_1 = require("../../../common/pagination/pagination.validator");
const typeorm_1 = require("typeorm");
const updateUser_validator_1 = require("../validator/updateUser.validator");
class UserService {
    profile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: userId } = req.user;
            const userRepository = config_1.AppDataSource.getRepository(user_entity_1.Users);
            const user = yield userRepository
                .createQueryBuilder("user")
                .leftJoin("user.planMemberships", "planMemberships")
                .select([
                'user.id as "id"',
                'user.name as "name"',
                'user.email AS "email"',
                'user.imageUrl AS "imageUrl"',
                'user.phone AS "phone"',
                'user.createdAt AS "createdAt"',
                'user.isBlocked AS "isBlockFlag"',
            ])
                .addSelect(`CASE WHEN planMemberships.expiresAt > :currentDate THEN "paid" ELSE "free" END`, "userType")
                .setParameter("currentDate", new Date())
                .where("user.id = :userId", { userId })
                .getRawOne();
            user.isBlocked = false;
            if (user.isBlockFlag === 1) {
                user.isBlocked = true;
            }
            delete user.isBlockFlag;
            if (!user) {
                throw (0, customError_1.CustomError)("User Does Not exist", 401);
            }
            return user;
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const userRepository = config_1.AppDataSource.getRepository(user_entity_1.Users);
            const user = yield userRepository.findOne({
                relations: {
                    planMemberships: true,
                },
                where: {
                    id,
                },
            });
            if (!user) {
                throw (0, customError_1.CustomError)("User Does Not exist", 401);
            }
            yield userRepository.remove(user);
            return true;
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const validatedData = (0, validation_1.validateRequest)(req.body, updateUser_validator_1.updateUserSchema);
            const userRepository = config_1.AppDataSource.getRepository(user_entity_1.Users);
            const user = yield userRepository.findOne({
                where: {
                    id,
                },
            });
            if (!user) {
                throw (0, customError_1.CustomError)("User Does Not exist", 401);
            }
            user.name = validatedData.name;
            user.email = validatedData.email;
            user.imageUrl = validatedData.imageUrl;
            // user.address = validatedData.address;
            yield userRepository.save(user);
            return user;
        });
    }
    toggleUserBlock(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const userRepository = config_1.AppDataSource.getRepository(user_entity_1.Users);
            const user = yield userRepository.findOne({
                where: {
                    id,
                },
            });
            if (!user) {
                throw (0, customError_1.CustomError)("User Does Not exist", 401);
            }
            user.isBlocked = !user.isBlocked;
            yield userRepository.save(user);
            return true;
        });
    }
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const userRepository = config_1.AppDataSource.getRepository(user_entity_1.Users);
            const user = yield userRepository.findOne({
                relations: {
                    planMemberships: { plan: true },
                },
                where: {
                    id,
                },
            });
            if (!user) {
                throw (0, customError_1.CustomError)("User Does Not exist", 401);
            }
            return user;
        });
    }
    getUserList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { limit = 10, page = 1, keyword = "", } = (0, validation_1.validateRequest)(req.query, pagination_validator_1.paginationSchema);
            const skip = limit * (page - 1);
            const userRepository = config_1.AppDataSource.getRepository(user_entity_1.Users);
            const where = {};
            const userQuery = userRepository
                .createQueryBuilder("user")
                .leftJoin("user.planMemberships", "planMemberships")
                .select([
                'user.id as "id"',
                'user.name as "name"',
                'user.email AS "email"',
                'user.imageUrl AS "imageUrl"',
                'user.phone AS "phone"',
                'user.isBlocked AS "isBlocked"',
                'user.createdAt AS "createdAt"',
            ])
                .addSelect(`CASE WHEN planMemberships.expiresAt > :currentDate AND planMemberships.startDate < :currentDate THEN "paid" ELSE "free" END`, "userType")
                .setParameter("currentDate", new Date());
            if (keyword && keyword !== "") {
                userQuery.andWhere("user.name LIKE :name OR user.phone LIKE :phone", {
                    name: `%${keyword}%`,
                    phone: `%${keyword}%`,
                });
            }
            const userList = yield userQuery
                .groupBy("user.id")
                .limit(limit)
                .offset(skip)
                .getRawMany();
            const count = yield userQuery.getCount();
            return {
                userList,
                count,
            };
        });
    }
    getUsersListForAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { keyword } = req.query;
            const userRepository = config_1.AppDataSource.getRepository(user_entity_1.Users);
            let where = [];
            if (keyword) {
                where.push({ name: (0, typeorm_1.Like)(`%${keyword}%`), isBlocked: false }, { phone: (0, typeorm_1.Like)(`%${keyword}%`), isBlocked: false });
            }
            const [userList, count] = yield userRepository.findAndCount({
                where: [...where],
                select: {
                    id: true,
                    name: true,
                    phone: true,
                },
            });
            return {
                userList,
                count,
            };
        });
    }
}
exports.userService = new UserService();
