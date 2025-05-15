
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

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
            <select
              id="recurrence-pattern"
              value={recurrencePattern}
              onChange={(e) => onRecurrencePatternChange(e.target.value as 'daily' | 'weekly' | 'monthly' | 'yearly')}
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
