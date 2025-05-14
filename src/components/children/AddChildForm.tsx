
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Child } from "@/types/children";

const formSchema = z.object({
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

type FormValues = z.infer<typeof formSchema>;

interface AddChildFormProps {
  onSuccess: () => void;
}

export function AddChildForm({ onSuccess }: AddChildFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      age: 0,
      birthday: "",
      school: "",
      grade: "",
      teacher: "",
      bloodType: "",
      allergies: "",
      medications: "",
      height: "",
      weight: "",
      lastCheckup: "",
      activities: "",
      gender: "female",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Simulating API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Convert comma-separated strings to arrays
      const newChild: Partial<Child> = {
        ...data,
        allergies: data.allergies ? data.allergies.split(',').map(item => item.trim()) : [],
        medications: data.medications ? data.medications.split(',').map(item => item.trim()) : [],
        activities: data.activities ? data.activities.split(',').map(item => item.trim()) : [],
        imageUrl: "",
        initials: data.name.split(' ').map(part => part[0]).join(''),
      };
      
      // Show success message
      toast.success("Criança adicionada com sucesso!");
      
      // Close the dialog
      onSuccess();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao adicionar criança");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome da criança" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Idade</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="birthday"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data de Nascimento</FormLabel>
                    <FormControl>
                      <Input placeholder="DD/MM/AAAA" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sexo</FormLabel>
                  <FormControl>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      {...field}
                    >
                      <option value="female">Feminino</option>
                      <option value="male">Masculino</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="school"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Escola</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome da escola" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="grade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Série</FormLabel>
                    <FormControl>
                      <Input placeholder="Série" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="teacher"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Professor(a)</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do professor" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="bloodType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo Sanguíneo</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: O+" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="lastCheckup"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Última Consulta</FormLabel>
                    <FormControl>
                      <Input placeholder="DD/MM/AAAA" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Altura</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 1.20m" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Peso</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 25kg" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="allergies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alergias</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Separados por vírgula (ex: Amendoim, Glúten)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="medications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Medicamentos</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Separados por vírgula (ex: Dipirona, Ibuprofeno)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="activities"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Atividades Extracurriculares</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Separadas por vírgula (ex: Natação, Ballet)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-2">
          <Button variant="outline" type="button" onClick={onSuccess}>Cancelar</Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Salvando..." : "Adicionar Criança"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
