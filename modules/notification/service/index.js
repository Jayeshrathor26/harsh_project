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
exports.notificationService = void 0;
const config_1 = require("../../../config/db/config");
const notification_entity_1 = require("../../../entities/notification/notification.entity");
class NotificationService {
    viewAllNotification(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const notificationRepository = config_1.AppDataSource.getRepository(notification_entity_1.Notification);
            yield notificationRepository.update({ isViewed: false }, { isViewed: true });
            return true;
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const notificationRepository = config_1.AppDataSource.getRepository(notification_entity_1.Notification);
            const [notification, total] = yield notificationRepository.findAndCount({
                order: {
                    createdAt: 'DESC'
                }
            });
            const notViewed = yield notificationRepository.count({
                where: {
                    isViewed: false
                },
            });
            return {
                notification,
                total,
                notViewed
            };
        });
    }
    addNotification(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const notificationRepository = config_1.AppDataSource.getRepository(notification_entity_1.Notification);
            const notification = yield notificationRepository.create({
                title: data.title,
                path: data.path
            });
            yield notificationRepository.save(notification);
        });
    }
}
exports.notificationService = new NotificationService();
