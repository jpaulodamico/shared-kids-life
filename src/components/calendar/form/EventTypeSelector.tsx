
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { EventType } from "@/pages/Calendar";

interface EventTypeSelectorProps {
  selectedType: EventType;
  onTypeSelect: (type: EventType) => void;
}

export function EventTypeSelector({ selectedType, onTypeSelect }: EventTypeSelectorProps) {
  const [open, setOpen] = useState(false);
  
  const eventTypes = [
    { label: "Médico", value: "medical" },
    { label: "Saúde", value: "health" },
    { label: "Escola", value: "school" },
    { label: "Atividade", value: "activity" },
    { label: "Família", value: "family" },
    { label: "Outro", value: "other" }
  ];

  const handleTypeSelect = (value: string) => {
    onTypeSelect(value as EventType);
    setOpen(false);
  };

  return (
    <div>
      <Label>Tipo de Evento</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {eventTypes.find(et => et.value === selectedType)?.label || "Selecione o tipo"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Buscar tipo..." />
            <CommandEmpty>Nenhum tipo encontrado.</CommandEmpty>
            <CommandGroup>
              {eventTypes.map((eventType) => (
                <CommandItem
                  key={eventType.value}
                  onSelect={() => handleTypeSelect(eventType.value)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedType === eventType.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {eventType.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
