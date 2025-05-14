
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AddChildForm } from "./AddChildForm";

interface ChildHeaderProps {
  title: string;
  description: string;
}

export const ChildHeader = ({ title, description }: ChildHeaderProps) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  const handleOpenChange = useCallback((open: boolean) => {
    setIsFormOpen(open);
  }, []);

  const handleSuccess = useCallback(() => {
    setIsFormOpen(false);
  }, []);
  
  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          <p className="text-muted-foreground">
            {description}
          </p>
        </div>
        <Button className="gap-1" onClick={() => setIsFormOpen(true)}>
          <Plus className="h-4 w-4" />
          Adicionar Criança
        </Button>
      </div>
      
      <Dialog open={isFormOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Adicionar Nova Criança</DialogTitle>
          </DialogHeader>
          <AddChildForm onSuccess={handleSuccess} />
        </DialogContent>
      </Dialog>
    </>
  );
};
