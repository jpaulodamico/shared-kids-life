
import { z } from "zod";

export const inviteFormSchema = z.object({
  email: z.string().email("Insira um email válido"),
  relation: z.string().min(1, "Selecione um tipo de relação"),
});

export type InviteFormValues = z.infer<typeof inviteFormSchema>;
