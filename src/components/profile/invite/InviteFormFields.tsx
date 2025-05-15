
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { InviteFormValues } from "./InviteSchema";
import { useInviteForm } from "./useInviteForm";

interface InviteFormFieldsProps {
  form: UseFormReturn<InviteFormValues>;
  onSubmit: () => void;
  isSubmitting: boolean;
  onCancel?: () => void;
  inviteCount?: number;
  inviteLimit?: number;
}

export function InviteFormFields({ 
  form, 
  onSubmit, 
  isSubmitting, 
  onCancel,
  inviteCount = 0, 
  inviteLimit = 5 
}: InviteFormFieldsProps) {
  const canInviteMore = inviteCount < inviteLimit;

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-6">
        {inviteCount > 0 && (
          <div className="text-sm text-muted-foreground">
            {canInviteMore ? (
              <p>Você já convidou {inviteCount} de {inviteLimit} responsáveis.</p>
            ) : (
              <p className="text-red-500">Você atingiu o limite de {inviteLimit} convites.</p>
            )}
          </div>
        )}
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email do responsável</FormLabel>
              <FormControl>
                <Input 
                  placeholder="exemplo@email.com" 
                  {...field} 
                  disabled={isSubmitting || !canInviteMore}
                />
              </FormControl>
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
                disabled={isSubmitting || !canInviteMore}
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a relação" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="parent">Pai/Mãe</SelectItem>
                  <SelectItem value="grandparent">Avô/Avó</SelectItem>
                  <SelectItem value="relative">Outro Familiar</SelectItem>
                  <SelectItem value="caretaker">Cuidador</SelectItem>
                  <SelectItem value="teacher">Professor</SelectItem>
                  <SelectItem value="doctor">Médico</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
          )}
          <Button type="submit" disabled={isSubmitting || !canInviteMore}>
            {isSubmitting ? "Enviando..." : "Criar Convite"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
