
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

interface AddChildFormProps {
  onSuccess: () => void;
}

export function AddChildForm({ onSuccess }: AddChildFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(true);
    
    try {
      // Simulating API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Convert comma-separated strings to arrays
      const newChild: Partial<Child> = {
        ...data,
        allergies: data.allergies ? data.allergies.split(',').map(item => item.trim()) : [],
        medications: data.medications ? data.medications.split(',').map(item => item.trim()) : [],
        activities: data.activities ? data.activities.split(',').map(item => item.trim()) : [],
        imageUrl: "",
        initials: data.name.split(' ').map(part => part[0]).join(''),
      };
      
      // Show success message
      toast.success("Criança adicionada com sucesso!");
      
      // Close the dialog
      onSuccess();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao adicionar criança");
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
