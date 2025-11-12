"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationMessageSchema = void 0;
const zod_1 = require("zod");
exports.notificationMessageSchema = zod_1.z.object({
    notification_id: zod_1.z.number().int(),
    class_id: zod_1.z.number().int().nullable().optional(),
    teacher_id: zod_1.z.number().int(),
    message: zod_1.z.string().max(500),
});
