"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const schema_1 = require("./interface/schema");
const logger_1 = require("./shared/logger");
async function default_1(message, context) {
    try {
        const raw = typeof message === 'string' ? JSON.parse(message) : message?.body ?? message;
        const parsed = schema_1.notificationMessageSchema.safeParse(raw);
        if (!parsed.success) {
            (0, logger_1.log)('warn', 'Invalid notification message', { errors: parsed.error.flatten(), raw });
            return; // Let poison message policies handle repeated failures if any
        }
        const notif = parsed.data;
        (0, logger_1.log)('info', 'Notification consumed', { notification_id: notif.notification_id, teacher_id: notif.teacher_id });
    }
    catch (err) {
        (0, logger_1.log)('error', 'Unhandled error consuming message', { error: err instanceof Error ? err.message : String(err) });
        throw err; // allow retry
    }
}
