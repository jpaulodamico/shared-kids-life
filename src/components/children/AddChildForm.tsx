
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { formSchema, FormValues } from "./form/childFormTypes";
import { BasicInfoFields } from "./form/BasicInfoFields";
import { HealthInfoFields } from "./form/HealthInfoFields";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

interface AddChildFormProps {
  onSuccess: () => void;
}

export function AddChildForm({ onSuccess }: AddChildFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

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
      activities: "",
      gender: "female",
    },
  });

  const onSubmit = async (data: FormValues) => {
    if (!user) {
      toast.error("Erro", {
        description: "Você precisa estar logado para adicionar uma criança"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Converte strings separadas por vírgula em arrays
      const allergiesArray = data.allergies ? data.allergies.split(',').map(item => item.trim()) : [];
      const medicationsArray = data.medications ? data.medications.split(',').map(item => item.trim()) : [];
      const activitiesArray = data.activities ? data.activities.split(',').map(item => item.trim()) : [];
      const initials = data.name.split(' ').map(part => part[0]).join('');
      
      // Usar a função que retorna o ID da criança
      const { data: childId, error: transactionError } = await supabase.rpc('add_child', {
        p_name: data.name,
        p_age: data.age,
        p_birthday: data.birthday,
        p_school: data.school,
        p_grade: data.grade,
        p_teacher: data.teacher,
        p_blood_type: data.bloodType,
        p_allergies: allergiesArray,
        p_medications: medicationsArray,
        p_height: data.height,
        p_weight: data.weight,
        p_activities: activitiesArray,
        p_gender: data.gender,
        p_image_url: "",
        p_initials: initials,
        p_relation: 'responsável'
      });
      
      if (transactionError) {
        console.error("Erro na transação:", transactionError);
        throw transactionError;
      }
      
      console.log("Criança adicionada com sucesso, ID:", childId);
      
      // Mostra mensagem de sucesso
      toast.success("Sucesso", {
        description: "Criança adicionada com sucesso!"
      });
      
      // Fecha o diálogo
      onSuccess();
    } catch (error: any) {
      console.error("Erro completo:", error);
      toast.error("Erro ao adicionar criança", {
        description: error.message || "Verifique os dados e tente novamente"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BasicInfoFields form={form} />
          <HealthInfoFields form={form} />
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
