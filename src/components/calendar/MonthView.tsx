
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { CalendarEvent, EventType } from "@/pages/Calendar";
import { CalendarIcon } from "lucide-react";

interface MonthViewProps {
  date: Date;
  events: CalendarEvent[];
  onSelectDate: (date: Date) => void;
  selectedDateEvents: CalendarEvent[];
  formatDate: (date: Date) => string;
  getBackgroundColor: (type: EventType) => string;
}

export function MonthView({
  date,
  events,
  onSelectDate,
  selectedDateEvents,
  formatDate,
  getBackgroundColor
}: MonthViewProps) {
  
  // Generate a list of dates with events
  const datesWithEvents = events.map(event => {
    const date = new Date(event.date);
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  });

  // Custom modifiers for dates with events
  const modifiers = {
    hasEvent: (day: Date) => 
      datesWithEvents.includes(`${day.getFullYear()}-${day.getMonth()}-${day.getDate()}`),
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Selecionar Data</span>
            <CalendarIcon className="w-5 h-5" />
          </CardTitle>
          <CardDescription>Clique em uma data para ver os eventos</CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => date && onSelectDate(date)}
            className="rounded-md border w-full pointer-events-auto"
            modifiers={modifiers}
            modifiersClassNames={{
              hasEvent: "bg-accent"
            }}
          />
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>
            {date ? formatDate(date) : "Selecione uma data"}
          </CardTitle>
          <CardDescription>
            {selectedDateEvents.length} evento(s) programado(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {selectedDateEvents.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              Não há eventos programados para esta data
            </div>
          ) : (
            <div className="space-y-4">
              {selectedDateEvents.map((event) => (
                <div key={event.id} className="flex items-start">
                  <div className={`w-3 h-3 mt-1.5 rounded-full mr-3 ${getBackgroundColor(event.type)}`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{event.title}</h3>
                      <span className="text-sm text-muted-foreground">
                        {event.time} 
                        {event.isRecurring && " (Recorrente)"}
                      </span>
                    </div>
                    <p className="text-sm">{event.description}</p>
                    <p className="text-sm text-muted-foreground">{event.location}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
