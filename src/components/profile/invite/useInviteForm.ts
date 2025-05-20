
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/lib/database-types";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { inviteFormSchema, InviteFormValues } from "./InviteSchema";

interface UseInviteFormProps {
  onSuccess: (inviteLink: string) => void;
}

export function useInviteForm({ onSuccess }: UseInviteFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inviteCount, setInviteCount] = useState(0);
  const [inviteLimit] = useState(5);
  const { user } = useAuth();

  const form = useForm<InviteFormValues>({
    resolver: zodResolver(inviteFormSchema),
    defaultValues: {
      email: "",
      relation: "parent"
    }
  });

  // Load the current count of invites
  useEffect(() => {
    if (user) {
      const getInviteCount = async () => {
        try {
          const { data, error, count } = await supabase
            .from('invites')
            .select('*', { count: 'exact' })
            .eq('inviter_id', user.id);
            
          if (error) throw error;
          
          setInviteCount(count || 0);
        } catch (error) {
          console.error("Error checking invite count:", error);
        }
      };
      
      getInviteCount();
    }
  }, [user]);

  const generateInviteCode = () => {
    return Math.random().toString(36).substring(2, 10);
  };

  const onSubmit = async (values: InviteFormValues) => {
    if (!user) {
      toast.error("Erro", {
        description: "Você precisa estar logado para convidar responsáveis"
      });
      return;
    }

    // Check if invite limit has been reached
    if (inviteCount >= inviteLimit) {
      toast.error("Limite de convites atingido", {
        description: `Você só pode convidar até ${inviteLimit} responsáveis.`
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Check if this email is already invited
      const { data: existingInvite, error: checkError } = await supabase
        .from('invites')
        .select('id')
        .eq('email', values.email)
        .eq('inviter_id', user.id);
        
      if (checkError) throw checkError;
      
      if (existingInvite && existingInvite.length > 0) {
        toast.error("Este email já foi convidado", {
          description: "Não é possível enviar outro convite para o mesmo email."
        });
        setIsSubmitting(false);
        return;
      }

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

      // Update local count
      setInviteCount(prev => prev + 1);

      // Gera o link de convite
      const inviteLink = `${window.location.origin}/app/invite/${inviteCode}`;
      
      toast.success("Convite criado", {
        description: `Convite para ${values.email} criado com sucesso`
      });
      
      // Retorna o link para exibição
      onSuccess(inviteLink);
    } catch (error: any) {
      console.error("Erro ao criar convite:", error);
      toast.error("Erro ao criar convite", {
        description: error.message || "Tente novamente mais tarde"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isSubmitting,
    inviteCount,
    inviteLimit,
    canInviteMore: inviteCount < inviteLimit
  };
}
