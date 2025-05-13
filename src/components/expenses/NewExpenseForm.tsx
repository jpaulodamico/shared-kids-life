
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageUpload } from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

// Schema para validação do formulário
const formSchema = z.object({
  amount: z.string().min(1, "Valor é obrigatório"),
  description: z.string().min(3, "Descrição deve ter pelo menos 3 caracteres"),
  category: z.string().min(1, "Categoria é obrigatória"),
  childId: z.string().min(1, "Criança é obrigatória"),
  attachment: z.string().optional(),
});

// Lista de crianças - seria obtida de uma API/banco de dados em uma aplicação real
const children = [
  { id: "1", name: "Sofia Santos" },
  { id: "2", name: "Lucas Santos" }
];

// Lista de categorias
const categories = [
  { id: "educação", name: "Educação" },
  { id: "saúde", name: "Saúde" },
  { id: "atividades", name: "Atividades Extracurriculares" },
  { id: "alimentação", name: "Alimentação" },
  { id: "outros", name: "Outros" }
];

type FormValues = z.infer<typeof formSchema>;

interface NewExpenseFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: FormValues) => void;
}

export function NewExpenseForm({ open, onOpenChange, onSubmit }: NewExpenseFormProps) {
  const { toast } = useToast();
  const [attachment, setAttachment] = useState<string>("");
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      description: "",
      category: "",
      childId: "",
      attachment: "",
    },
  });

  const handleSubmit = (data: FormValues) => {
    // Incluir o anexo nos dados
    const finalData = { ...data, attachment };
    
    // Aqui você enviaria os dados para o backend
    console.log("Dados da despesa:", finalData);
    
    // Feedback para o usuário
    toast({
      title: "Despesa adicionada",
      description: `${data.description} - R$ ${data.amount}`,
    });
    
    // Resetar o formulário
    form.reset();
    setAttachment("");
    
    // Fechar o modal
    onOpenChange(false);
    
    // Callback para o componente pai
    if (onSubmit) {
      onSubmit(finalData);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nova Despesa</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor (R$)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0,00"
                      step="0.01"
                      min="0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Descreva a despesa"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="childId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Criança</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma criança" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {children.map(child => (
                        <SelectItem key={child.id} value={child.id}>
                          {child.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormItem>
              <FormLabel>Anexo (opcional)</FormLabel>
              <ImageUpload
                value={attachment}
                onChange={setAttachment}
                onRemove={() => setAttachment("")}
              />
            </FormItem>
            
            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
