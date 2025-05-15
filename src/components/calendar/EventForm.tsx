
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CalendarEvent, EventType } from "@/pages/Calendar";
import { DialogFooter } from "@/components/ui/dialog";
import { ChildSelector } from "./form/ChildSelector";
import { EventTypeSelector } from "./form/EventTypeSelector";
import { RecurrenceOptions } from "./form/RecurrenceOptions";
import { DateTimeSelector } from "./form/DateTimeSelector";

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
  const [childId, setChildId] = useState<number | undefined>(initialEvent?.childId);
  
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
      endRecurrenceDate: isRecurring ? endRecurrenceDate : undefined,
      childId
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
      
      <DateTimeSelector
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        time={time}
        onTimeChange={setTime}
      />
      
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

      <ChildSelector 
        selectedChildId={childId} 
        onChildSelect={setChildId} 
      />
      
      <EventTypeSelector 
        selectedType={type} 
        onTypeSelect={setType} 
      />
      
      <RecurrenceOptions
        isRecurring={isRecurring}
        onRecurringChange={setIsRecurring}
        recurrencePattern={recurrencePattern}
        onRecurrencePatternChange={setRecurrencePattern}
        endRecurrenceDate={endRecurrenceDate}
        onEndRecurrenceDateChange={setEndRecurrenceDate}
        eventDate={selectedDate}
      />
      
      <DialogFooter>
        <Button type="submit">Salvar Evento</Button>
      </DialogFooter>
    </form>
  );
}
