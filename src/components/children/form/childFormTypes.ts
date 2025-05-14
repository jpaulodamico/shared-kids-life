
import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres" }),
  age: z.coerce.number().min(0).max(18),
  birthday: z.string().min(1, { message: "Data de nascimento é obrigatória" }),
  school: z.string().min(1, { message: "Escola é obrigatória" }),
  grade: z.string().min(1, { message: "Série é obrigatória" }),
  teacher: z.string().min(1, { message: "Nome do professor é obrigatório" }),
  bloodType: z.string().min(1, { message: "Tipo sanguíneo é obrigatório" }),
  allergies: z.string().optional(),
  medications: z.string().optional(),
  height: z.string().min(1, { message: "Altura é obrigatória" }),
  weight: z.string().min(1, { message: "Peso é obrigatório" }),
  lastCheckup: z.string().min(1, { message: "Data da última consulta é obrigatória" }),
  activities: z.string().optional(),
  gender: z.enum(["male", "female"], { 
    required_error: "Sexo é obrigatório"
  }),
});

export type FormValues = z.infer<typeof formSchema>;
