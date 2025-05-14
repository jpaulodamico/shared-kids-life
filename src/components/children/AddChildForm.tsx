
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { Child } from "@/types/children";
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
      lastCheckup: "",
      activities: "",
      gender: "female",
    },
  });

  const onSubmit = async (data: FormValues) => {
    if (!user) {
      toast.error("Você precisa estar logado para adicionar uma criança");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Converte strings separadas por vírgula em arrays
      const allergiesArray = data.allergies ? data.allergies.split(',').map(item => item.trim()) : [];
      const medicationsArray = data.medications ? data.medications.split(',').map(item => item.trim()) : [];
      const activitiesArray = data.activities ? data.activities.split(',').map(item => item.trim()) : [];
      const initials = data.name.split(' ').map(part => part[0]).join('');
      
      // Insere a criança na tabela children
      const { data: childData, error: childError } = await supabase
        .from('children')
        .insert({
          name: data.name,
          age: data.age,
          birthday: data.birthday,
          school: data.school,
          grade: data.grade,
          teacher: data.teacher,
          blood_type: data.bloodType,
          allergies: allergiesArray,
          medications: medicationsArray,
          height: data.height,
          weight: data.weight,
          last_checkup: data.lastCheckup,
          activities: activitiesArray,
          gender: data.gender,
          image_url: "",
          initials: initials
        })
        .select('id')
        .single();
      
      if (childError) {
        throw childError;
      }
      
      // Associa a criança ao usuário na tabela user_children
      const { error: relationError } = await supabase
        .from('user_children')
        .insert({
          user_id: user.id,
          child_id: childData.id,
          relation: 'responsável' // Pode ser configurável no futuro
        });
      
      if (relationError) {
        throw relationError;
      }
      
      // Mostra mensagem de sucesso
      toast.success("Criança adicionada com sucesso!");
      
      // Fecha o diálogo
      onSuccess();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao adicionar criança", { 
        description: "Verifique os dados e tente novamente." 
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
