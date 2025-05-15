
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { eventFormSchema, EventFormValues } from "./form/eventFormSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

interface EventFormProps {
  onSubmit: (event: Omit<CalendarEvent, "id">) => void;
  initialEvent?: Omit<CalendarEvent, "id">;
}

export function EventForm({ onSubmit, initialEvent }: EventFormProps) {
  // Set up form with validation
  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: initialEvent?.title || "",
      date: initialEvent?.date || new Date(),
      time: initialEvent?.time || "",
      description: initialEvent?.description || "",
      location: initialEvent?.location || "",
      type: initialEvent?.type || "other",
      isRecurring: initialEvent?.isRecurring || false,
      recurrencePattern: initialEvent?.recurrencePattern || "weekly",
      endRecurrenceDate: initialEvent?.endRecurrenceDate || undefined,
      childId: initialEvent?.childId || undefined,
    },
  });

  // Form submission handler
  const handleFormSubmit = (data: EventFormValues) => {
    try {
      onSubmit({
        title: data.title,
        date: data.date,
        time: data.time,
        description: data.description || "",
        type: data.type,
        location: data.location,
        isRecurring: data.isRecurring,
        recurrencePattern: data.isRecurring ? data.recurrencePattern : undefined,
        endRecurrenceDate: data.isRecurring ? data.endRecurrenceDate : undefined,
        childId: data.childId
      });
      
      toast.success("Evento salvo com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar evento:", error);
      toast.error("Erro ao salvar evento. Tente novamente.");
    }
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <DateTimeSelector
                selectedDate={field.value}
                onDateChange={field.onChange}
                time={form.watch("time")}
                onTimeChange={(time) => form.setValue("time", time)}
              />
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
                <Textarea rows={2} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Local</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="childId"
          render={({ field }) => (
            <FormItem>
              <ChildSelector 
                selectedChildId={field.value} 
                onChildSelect={field.onChange}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <EventTypeSelector 
                selectedType={field.value} 
                onTypeSelect={field.onChange}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="isRecurring"
          render={({ field }) => (
            <FormItem>
              <RecurrenceOptions
                isRecurring={field.value}
                onRecurringChange={field.onChange}
                recurrencePattern={form.watch("recurrencePattern") || "weekly"}
                onRecurrencePatternChange={(pattern) => form.setValue("recurrencePattern", pattern)}
                endRecurrenceDate={form.watch("endRecurrenceDate")}
                onEndRecurrenceDateChange={(date) => form.setValue("endRecurrenceDate", date)}
                eventDate={form.watch("date")}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        
        <DialogFooter>
          <Button type="submit">Salvar Evento</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
