
import { useState } from "react";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { Bell, Mail, Lock } from "lucide-react";
import { toast } from "sonner";

interface SettingsFormProps {
  defaultValues: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    calendarSync: boolean;
    expenseReminders: boolean;
    documentSharing: boolean;
  };
}

export function SettingsForm({ defaultValues }: SettingsFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm({
    defaultValues,
  });

  const onSubmit = (data: any) => {
    setIsSubmitting(true);
    // Simulando um envio para API
    setTimeout(() => {
      console.log("Settings saved:", data);
      toast.success("Configurações salvas com sucesso");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notificações
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="emailNotifications"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between space-y-0 rounded-lg border p-4">
                  <div>
                    <FormLabel className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Notificações por Email
                    </FormLabel>
                    <FormDescription>
                      Receba atualizações importantes por email
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pushNotifications"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between space-y-0 rounded-lg border p-4">
                  <div>
                    <FormLabel>Notificações Push</FormLabel>
                    <FormDescription>
                      Receba notificações em tempo real
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="calendarSync"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between space-y-0 rounded-lg border p-4">
                  <div>
                    <FormLabel>Sincronizar Calendário</FormLabel>
                    <FormDescription>
                      Sincronizar eventos com seu calendário pessoal
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expenseReminders"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between space-y-0 rounded-lg border p-4">
                  <div>
                    <FormLabel>Lembretes de Despesas</FormLabel>
                    <FormDescription>
                      Receba lembretes sobre despesas pendentes
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="documentSharing"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between space-y-0 rounded-lg border p-4">
                  <div>
                    <FormLabel>Compartilhamento de Documentos</FormLabel>
                    <FormDescription>
                      Notificar quando novos documentos forem compartilhados
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Segurança
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" type="button" className="w-full">
              Alterar Senha
            </Button>
            <Button variant="outline" type="button" className="w-full" disabled>
              Ativar Verificação em Duas Etapas
            </Button>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Salvando..." : "Salvar Configurações"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
