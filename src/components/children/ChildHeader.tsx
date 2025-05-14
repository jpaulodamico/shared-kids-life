
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ChildHeaderProps {
  title: string;
  description: string;
}

export const ChildHeader = ({ title, description }: ChildHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-muted-foreground">
          {description}
        </p>
      </div>
      <Button className="gap-1">
        <Plus className="h-4 w-4" />
        Adicionar Criança
      </Button>
    </div>
  );
};
