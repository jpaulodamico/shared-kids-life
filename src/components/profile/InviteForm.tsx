
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Copy, ExternalLink } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

const formSchema = z.object({
  email: z.string().email("Insira um email válido"),
  relation: z.string().min(1, "Selecione um tipo de relação"),
});

type FormValues = z.infer<typeof formSchema>;

export function InviteForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inviteLink, setInviteLink] = useState<string>("");
  const { user } = useAuth();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      relation: "",
    },
  });

  const generateInviteCode = () => {
    // Gera um código aleatório de 8 caracteres
    return Math.random().toString(36).substring(2, 10);
  };

  const onSubmit = async (values: FormValues) => {
    if (!user) return;
    
    setIsSubmitting(true);
    try {
      // Gerar um código de convite único
      const inviteCode = generateInviteCode();
      
      // Criar registro do convite no Supabase
      const { error } = await supabase
        .from('invites')
        .insert([
          { 
            inviter_id: user.id,
            email: values.email,
            relation: values.relation,
            code: inviteCode,
            status: 'pending'
          }
        ]);
      
      if (error) throw error;
      
      // Gerar link de convite
      const inviteUrl = `${window.location.origin}/welcome?invite=${inviteCode}&email=${encodeURIComponent(values.email)}`;
      setInviteLink(inviteUrl);
      
      toast.success("Convite gerado com sucesso!");
      
    } catch (error: any) {
      console.error("Erro ao gerar convite:", error);
      toast.error("Erro ao gerar convite", {
        description: error.message
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink)
      .then(() => {
        toast.success("Link copiado para a área de transferência");
      })
      .catch(() => {
        toast.error("Erro ao copiar o link");
      });
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
          
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Gerando convite..." : "Gerar link de convite"}
          </Button>
        </form>
      </Form>
      
      {inviteLink && (
        <div className="mt-6 p-4 border rounded-md bg-muted">
          <h3 className="font-medium mb-2">Link de convite gerado:</h3>
          <div className="flex items-center gap-2">
            <Input 
              value={inviteLink} 
              readOnly 
              className="flex-1 text-sm font-mono bg-white"
            />
            <Button onClick={handleCopyLink} size="sm" variant="outline">
              <Copy className="h-4 w-4 mr-1" />
              Copiar
            </Button>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            <p className="mb-2">Compartilhe este link com o familiar para que ele possa se juntar à aplicação.</p>
            <div className="flex items-center gap-2">
              <Button
                variant="link"
                className="p-0 h-auto flex items-center gap-1 text-sm"
                onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(`Olá! Convido você a participar do CoParent. Use este link para se juntar: ${inviteLink}`)}`, '_blank')}
              >
                <ExternalLink className="h-4 w-4" />
                Compartilhar via WhatsApp
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
