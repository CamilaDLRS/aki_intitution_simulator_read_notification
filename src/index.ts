import { InvocationContext } from '@azure/functions';
import { notificationMessageSchema, NotificationMessage } from './interface/schema';
import { log } from './shared/logger';

export default async function (message: any, context: InvocationContext): Promise<void> {
  try {
    const raw = typeof message === 'string' ? JSON.parse(message) : message?.body ?? message;
    const parsed = notificationMessageSchema.safeParse(raw);
    if (!parsed.success) {
      log('warn', 'Invalid notification message', { errors: parsed.error.flatten(), raw });
      return; // Let poison message policies handle repeated failures if any
    }

    const notif: NotificationMessage = parsed.data;
    log('info', 'Notification consumed', { notification_id: notif.notification_id, teacher_id: notif.teacher_id });
  } catch (err) {
    log('error', 'Unhandled error consuming message', { error: err instanceof Error ? err.message : String(err) });
    throw err; // allow retry
  }
}
