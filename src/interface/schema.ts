import { z } from 'zod';

export const notificationMessageSchema = z.object({
  notification_id: z.number().int(),
  class_id: z.number().int().nullable().optional(),
  teacher_id: z.number().int(),
  message: z.string().max(500),
});

export type NotificationMessage = z.infer<typeof notificationMessageSchema>;
