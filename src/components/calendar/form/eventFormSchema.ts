
import { z } from "zod";
import { EventType } from "@/pages/Calendar";

// Define the recurrence pattern schema separately for better reusability
const recurrencePatternSchema = z.enum(["daily", "weekly", "monthly", "yearly"]);

export const eventFormSchema = z.object({
  title: z.string().min(1, { message: "O título é obrigatório" }),
  date: z.date({ required_error: "A data é obrigatória" }),
  time: z.string().min(1, { message: "O horário é obrigatório" }),
  description: z.string().optional(),
  location: z.string().min(1, { message: "O local é obrigatório" }),
  type: z.enum(["medical", "school", "activity", "family", "other"] as const),
  isRecurring: z.boolean().default(false),
  // Only validate recurrencePattern if isRecurring is true
  recurrencePattern: z.preprocess(
    (val) => val === "" ? undefined : val,
    recurrencePatternSchema.optional()
  ),
  // Only validate endRecurrenceDate if isRecurring is true
  endRecurrenceDate: z.date().optional().nullable(),
  childId: z.string().optional(), // Updated: Changed from number to string
}).refine((data) => {
  // If isRecurring is true, recurrencePattern must be provided
  if (data.isRecurring && !data.recurrencePattern) {
    return false;
  }
  return true;
}, {
  message: "Padrão de recorrência é obrigatório para eventos recorrentes",
  path: ["recurrencePattern"]
});

// Export the type and the recurrence pattern type for reuse
export type EventFormValues = z.infer<typeof eventFormSchema>;
export type RecurrencePattern = z.infer<typeof recurrencePatternSchema>;
