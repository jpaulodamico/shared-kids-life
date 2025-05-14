
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";
import { inviteFormSchema, InviteFormValues } from "./InviteSchema";

interface UseInviteFormProps {
  onSuccess: (inviteLink: string) => void;
}

export function useInviteForm({ onSuccess }: UseInviteFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const form = useForm<InviteFormValues>({
    resolver: zodResolver(inviteFormSchema),
    defaultValues: {
      email: "",
      relation: "parente"
    }
  });

  const generateInviteCode = () => {
    return Math.random().toString(36).substring(2, 10);
  };

  const onSubmit = async (values: InviteFormValues) => {
    if (!user) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para convidar responsáveis",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Gera um código de convite único
      const inviteCode = generateInviteCode();

      // Salva o convite no banco de dados
      const { error } = await supabase
        .from('invites')
        .insert({
          email: values.email,
          inviter_id: user.id,
          relation: values.relation,
          code: inviteCode,
          status: 'pending'
        });

      if (error) throw error;

      // Gera o link de convite
      const inviteLink = `${window.location.origin}/app/invite/${inviteCode}`;
      
      toast({
        title: "Convite criado",
        description: `Convite para ${values.email} criado com sucesso`
      });
      
      // Retorna o link para exibição
      onSuccess(inviteLink);
    } catch (error: any) {
      console.error("Erro ao criar convite:", error);
      toast({
        title: "Erro ao criar convite",
        description: error.message || "Tente novamente mais tarde",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isSubmitting
  };
}
