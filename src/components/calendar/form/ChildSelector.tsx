
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { children } from "@/data/childrenData";
import { CHILD_COLORS } from "@/pages/Calendar";

interface ChildSelectorProps {
  selectedChildId: string | undefined;
  onChildSelect: (childId: string | undefined) => void;
}

export function ChildSelector({ selectedChildId, onChildSelect }: ChildSelectorProps) {
  const [open, setOpen] = useState(false);

  // Handler for child selection
  const handleChildSelect = (id: string) => {
    onChildSelect(id);
    setOpen(false);
  };

  // Handler for when no child is selected
  const handleNoChildSelect = () => {
    onChildSelect(undefined);
    setOpen(false);
  };

  return (
    <div>
      <Label>Criança</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button" // Explicitly set type to button to prevent form submission
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {selectedChildId !== undefined ? children.find(c => c.id === selectedChildId)?.name || "Selecione uma criança" : "Selecione uma criança"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Buscar criança..." />
            <CommandEmpty>Nenhuma criança encontrada.</CommandEmpty>
            <CommandGroup>
              {children.map((child) => (
                <CommandItem
                  key={child.id}
                  onSelect={() => handleChildSelect(child.id)}
                  className="flex items-center"
                >
                  <div className={cn(
                    "mr-2 h-4 w-4 rounded-full",
                    CHILD_COLORS[child.id]?.split(" ")[0] || "bg-gray-300"
                  )}></div>
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedChildId === child.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {child.name}
                </CommandItem>
              ))}
              <CommandItem onSelect={handleNoChildSelect}>
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedChildId === undefined ? "opacity-100" : "opacity-0"
                  )}
                />
                Nenhuma criança (evento geral)
              </CommandItem>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
