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
// Import the express module
const express_1 = __importDefault(require("express"));
const config_1 = require("./config/db/config");
const controller_1 = require("./modules/auth/controller");
const dotenv_1 = require("dotenv");
const cors_1 = __importDefault(require("cors"));
const controller_2 = require("./modules/products/controller");
const controller_3 = require("./modules/admin/controller");
const controller_4 = require("./modules/user/controller");
const controller_5 = require("./modules/plan-membership/controller");
const controller_6 = require("./modules/plan/controller");
const controller_7 = require("./modules/upload/controller");
const controller_8 = require("./modules/notification/controller");
const controller_9 = require("./modules/products-fip/controller");
const controller_10 = require("./modules/category-fip/controller");
const controller_11 = require("./modules/sub-category-fip/controller");
(0, dotenv_1.config)();
// Create an instance of the express app
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: "*" }));
// Define a route for the root URL
app.use(express_1.default.static(__dirname + "/public"));
app.get("/fuel-engine/health", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(config_1.AppDataSource.isInitialized ? "connected" : "not connected");
}));
app.use("/fuel-engine/images", express_1.default.static("public"));
app.use("/fuel-engine/files", controller_7.uploadRoutes);
app.use("/fuel-engine/auth", controller_1.authRoutes);
app.use("/fuel-engine/admin", controller_3.adminRoutes);
app.use("/fuel-engine/products", controller_2.productRoutes);
app.use("/fuel-engine/users", controller_4.userRoutes);
app.use("/fuel-engine/memberships", controller_5.planMembershipRoutes);
app.use("/fuel-engine/plans", controller_6.planRoutes);
app.use("/fuel-engine/notification", controller_8.notificationRoutes);
app.use("/fuel-engine/products-fip", controller_9.productFipRoutes);
app.use("/fuel-engine/category-fip", controller_10.categoryFipRoutes);
app.use("/fuel-engine/sub-category-fip", controller_11.subCategoryFipRoutes);
// const PORT = process.env.PORT || 3002;
const PORT = process.env.PORT || 3004;
// Start the server
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    yield config_1.AppDataSource.initialize();
    console.log(`Server is running on http://localhost:${PORT}`);
}));
