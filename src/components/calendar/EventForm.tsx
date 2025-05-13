
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarEvent, EventType } from "@/pages/Calendar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { DialogFooter } from "@/components/ui/dialog";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Switch } from "@/components/ui/switch";

interface EventFormProps {
  onSubmit: (event: Omit<CalendarEvent, "id">) => void;
  initialEvent?: Omit<CalendarEvent, "id">;
}

export function EventForm({ onSubmit, initialEvent }: EventFormProps) {
  const [title, setTitle] = useState(initialEvent?.title || "");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(initialEvent?.date || new Date());
  const [time, setTime] = useState(initialEvent?.time || "");
  const [description, setDescription] = useState(initialEvent?.description || "");
  const [location, setLocation] = useState(initialEvent?.location || "");
  const [type, setType] = useState<EventType>(initialEvent?.type || "other");
  const [isRecurring, setIsRecurring] = useState(initialEvent?.isRecurring || false);
  const [recurrencePattern, setRecurrencePattern] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>(
    initialEvent?.recurrencePattern || 'weekly'
  );
  const [endRecurrenceDate, setEndRecurrenceDate] = useState<Date | undefined>(
    initialEvent?.endRecurrenceDate || undefined
  );
  
  const [open, setOpen] = useState(false);
  
  const eventTypes = [
    { label: "Médico", value: "medical" },
    { label: "Escola", value: "school" },
    { label: "Atividade", value: "activity" },
    { label: "Família", value: "family" },
    { label: "Outro", value: "other" }
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !selectedDate || !time || !location) {
      return;
    }
    
    onSubmit({
      title,
      date: selectedDate,
      time,
      description,
      type,
      location,
      isRecurring,
      recurrencePattern: isRecurring ? recurrencePattern : undefined,
      endRecurrenceDate: isRecurring ? endRecurrenceDate : undefined
    });
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Título</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Data</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !selectedDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? (
                  format(selectedDate, "dd/MM/yyyy", { locale: ptBR })
                ) : (
                  <span>Selecionar data</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div>
          <Label htmlFor="time">Horário</Label>
          <Input
            id="time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
        />
      </div>
      
      <div>
        <Label htmlFor="location">Local</Label>
        <Input
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>
      
      <div>
        <Label>Tipo de Evento</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {eventTypes.find(et => et.value === type)?.label || "Selecione o tipo"}
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
                    onSelect={() => {
                      setType(eventType.value as EventType);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        type === eventType.value ? "opacity-100" : "opacity-0"
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
      
      <div className="flex items-center space-x-2">
        <Switch
          id="recurring"
          checked={isRecurring}
          onCheckedChange={setIsRecurring}
        />
        <Label htmlFor="recurring">Evento recorrente</Label>
      </div>
      
      {isRecurring && (
        <>
          <div>
            <Label htmlFor="recurrence-pattern">Padrão de recorrência</Label>
            <select
              id="recurrence-pattern"
              value={recurrencePattern}
              onChange={(e) => setRecurrencePattern(e.target.value as 'daily' | 'weekly' | 'monthly' | 'yearly')}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            >
              <option value="daily">Diário</option>
              <option value="weekly">Semanal</option>
              <option value="monthly">Mensal</option>
              <option value="yearly">Anual</option>
            </select>
          </div>
          
          <div>
            <Label htmlFor="end-date">Data final (opcional)</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="end-date"
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !endRecurrenceDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endRecurrenceDate ? (
                    format(endRecurrenceDate, "dd/MM/yyyy", { locale: ptBR })
                  ) : (
                    <span>Sem data final</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endRecurrenceDate}
                  onSelect={setEndRecurrenceDate}
                  disabled={(date) => (selectedDate ? date <= selectedDate : false)}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
        </>
      )}
      
      <DialogFooter>
        <Button type="submit">Salvar Evento</Button>
      </DialogFooter>
    </form>
  );
}
