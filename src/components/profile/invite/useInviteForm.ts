
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { inviteFormSchema, InviteFormValues } from "./InviteSchema";

export function useInviteForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inviteLink, setInviteLink] = useState<string>("");
  const { user } = useAuth();

  const form = useForm<InviteFormValues>({
    resolver: zodResolver(inviteFormSchema),
    defaultValues: {
      email: "",
      relation: "",
    },
  });

  const generateInviteCode = () => {
    // Gera um código aleatório de 8 caracteres
    return Math.random().toString(36).substring(2, 10);
  };

  const onSubmit = async (values: InviteFormValues) => {
    if (!user) {
      toast.error("Você precisa estar logado para convidar familiares");
      return;
    }
    
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

  return {
    form,
    isSubmitting,
    inviteLink,
    onSubmit,
  };
}
