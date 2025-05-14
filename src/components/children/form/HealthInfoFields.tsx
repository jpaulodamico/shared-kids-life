
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "./childFormTypes";

interface HealthInfoFieldsProps {
  form: UseFormReturn<FormValues>;
}

export function HealthInfoFields({ form }: HealthInfoFieldsProps) {
  return (
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
        
        {/* Removed lastCheckup field */}
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
  );
}
