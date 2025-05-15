
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface RecurrenceOptionsProps {
  isRecurring: boolean;
  onRecurringChange: (isRecurring: boolean) => void;
  recurrencePattern: 'daily' | 'weekly' | 'monthly' | 'yearly';
  onRecurrencePatternChange: (pattern: 'daily' | 'weekly' | 'monthly' | 'yearly') => void;
  endRecurrenceDate: Date | undefined;
  onEndRecurrenceDateChange: (date: Date | undefined) => void;
  eventDate: Date | undefined;
}

export function RecurrenceOptions({
  isRecurring,
  onRecurringChange,
  recurrencePattern,
  onRecurrencePatternChange,
  endRecurrenceDate,
  onEndRecurrenceDateChange,
  eventDate
}: RecurrenceOptionsProps) {
  return (
    <>
      <div className="flex items-center space-x-2">
        <Switch
          id="recurring"
          checked={isRecurring}
          onCheckedChange={onRecurringChange}
        />
        <Label htmlFor="recurring">Evento recorrente</Label>
      </div>
      
      {isRecurring && (
        <>
          <div>
            <Label htmlFor="recurrence-pattern">Padrão de recorrência</Label>
            <Select
              value={recurrencePattern}
              onValueChange={(value) => onRecurrencePatternChange(value as 'daily' | 'weekly' | 'monthly' | 'yearly')}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione o padrão de recorrência" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Diário</SelectItem>
                <SelectItem value="weekly">Semanal</SelectItem>
                <SelectItem value="monthly">Mensal</SelectItem>
                <SelectItem value="yearly">Anual</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="end-date">Data final (opcional)</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button" // Prevent form submission
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
                  onSelect={onEndRecurrenceDateChange}
                  disabled={(date) => (eventDate ? date <= eventDate : false)}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
        </>
      )}
    </>
  );
}
