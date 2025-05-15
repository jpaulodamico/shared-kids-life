
import { z } from "zod";
import { EventType } from "@/pages/Calendar";

export const eventFormSchema = z.object({
  title: z.string().min(1, { message: "O título é obrigatório" }),
  date: z.date({ required_error: "A data é obrigatória" }),
  time: z.string().min(1, { message: "O horário é obrigatório" }),
  description: z.string().optional(),
  location: z.string().min(1, { message: "O local é obrigatório" }),
  type: z.enum(["medical", "school", "activity", "family", "other"] as const),
  isRecurring: z.boolean().default(false),
  recurrencePattern: z.enum(["daily", "weekly", "monthly", "yearly"] as const).optional(),
  endRecurrenceDate: z.date().optional().nullable(),
  childId: z.number().optional(),
});

export type EventFormValues = z.infer<typeof eventFormSchema>;
