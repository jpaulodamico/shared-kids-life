
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { InviteFormValues } from "./InviteSchema";
import { Button } from "@/components/ui/button";
import { BaseSyntheticEvent } from "react";

interface InviteFormFieldsProps {
  form: UseFormReturn<InviteFormValues>;
  onSubmit: (e?: BaseSyntheticEvent) => Promise<void>;
  isSubmitting: boolean;
  onCancel?: () => void;
}

export function InviteFormFields({ form, onSubmit, isSubmitting, onCancel }: InviteFormFieldsProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email do familiar</FormLabel>
            <FormControl>
              <Input placeholder="email@exemplo.com" {...field} />
            </FormControl>
            <FormDescription>
              O email da pessoa que você deseja convidar
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="relation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Relação com a criança</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma relação" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="parent">Pai/Mãe</SelectItem>
                <SelectItem value="grandparent">Avô/Avó</SelectItem>
                <SelectItem value="guardian">Responsável legal</SelectItem>
                <SelectItem value="other">Outro</SelectItem>
              </SelectContent>
            </Select>
            <FormDescription>
              Como este familiar se relaciona com a criança
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="flex justify-end gap-2 pt-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Enviar convite"}
        </Button>
      </div>
    </form>
  );
}
