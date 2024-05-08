"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = exports.mysqlConfig = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
const user_entity_1 = require("../../entities/user/user.entity");
const catgeory_entity_1 = require("../../entities/product/catgeory.entity");
const products_entity_1 = require("../../entities/product/products.entity");
const otp_entity_1 = require("../../entities/user/otp.entity");
const brand_entity_1 = require("../../entities/product/brand.entity");
const plan_entity_1 = require("../../entities/plan/plan.entity");
const plan_membership_entity_1 = require("../../entities/plan/plan-membership.entity");
const admin_entity_1 = require("../../entities/user/admin.entity");
const sub_category_1 = require("../../entities/product/sub-category");
const products_entity_2 = require("../../entities/msi/products.entity");
const catgeory_entity_2 = require("../../entities/msi/catgeory.entity");
const notification_entity_1 = require("../../entities/notification/notification.entity");
const products_entity_3 = require("../../entities/fip/products.entity");
const catgeory_entity_3 = require("../../entities/fip/catgeory.entity");
const sub_category_2 = require("../../entities/fip/sub-category");
(0, dotenv_1.config)();
exports.mysqlConfig = {
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    migrationsTableName: "migrations",
    entities: [
        user_entity_1.Users,
        otp_entity_1.OTP,
        admin_entity_1.Admin,
        brand_entity_1.Brand,
        products_entity_1.Product,
        catgeory_entity_1.Category,
        plan_entity_1.Plan,
        plan_membership_entity_1.PlanMembership,
        sub_category_1.SubCategory,
        products_entity_2.ProductMSI,
        catgeory_entity_2.CategoryMSI,
        notification_entity_1.Notification,
        products_entity_3.ProductFIP,
        catgeory_entity_3.CategoryFIP,
        sub_category_2.SubCategoryFIP,
    ],
    migrations: ["dist/config/db/migrations/*.js"],
    connectTimeout: 20000,
};
exports.AppDataSource = new typeorm_1.DataSource(exports.mysqlConfig);
