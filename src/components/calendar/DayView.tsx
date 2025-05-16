
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format, addDays, subDays, isSameDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CalendarEvent, EventType } from "@/pages/Calendar";
import { cn } from "@/lib/utils";
import { children } from "@/data/childrenData";

interface DayViewProps {
  date: Date;
  events: CalendarEvent[];
  onSelectDate: (date: Date) => void;
  getBackgroundColor: (type: EventType) => string;
  getChildColor: (childId?: string) => string; // Updated: Changed from number to string
}

export function DayView({
  date,
  events,
  onSelectDate,
  getBackgroundColor,
  getChildColor
}: DayViewProps) {
  // Filter events for the selected date
  const dayEvents = events.filter(
    (event) => 
      date && 
      isSameDay(event.date, date)
  );
  
  // Group events by hour
  const hourlyEvents: Record<string, CalendarEvent[]> = {};
  
  // Create time slots for each hour
  for (let i = 6; i < 22; i++) {
    const hourStr = i.toString().padStart(2, '0') + ':00';
    hourlyEvents[hourStr] = [];
  }
  
  // Place events in their corresponding time slots
  dayEvents.forEach(event => {
    const [hour] = event.time.split(':');
    const hourKey = hour.padStart(2, '0') + ':00';
    
    if (hourlyEvents[hourKey]) {
      hourlyEvents[hourKey].push(event);
    } else {
      // If the hour is outside our range, add it to the closest available hour
      const hourNum = parseInt(hour);
      if (hourNum < 6) hourlyEvents['06:00'].push(event);
      else if (hourNum >= 22) hourlyEvents['21:00'].push(event);
    }
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onSelectDate(subDays(date, 1))}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <h2 className="text-xl font-bold">
          {format(date, "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR })}
        </h2>
        
        <Button
          variant="outline"
          size="icon"
          onClick={() => onSelectDate(addDays(date, 1))}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      <Card className="overflow-hidden">
        <CardHeader className="bg-accent">
          <CardTitle className="text-center">{format(date, "d MMMM yyyy", { locale: ptBR })}</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {Object.entries(hourlyEvents).map(([hour, hourEvents]) => (
              <div key={hour} className={cn(
                "flex py-4 px-4",
                hourEvents.length > 0 ? "bg-accent/10" : ""
              )}>
                <div className="w-16 text-muted-foreground font-medium">
                  {hour}
                </div>
                <div className="flex-1 space-y-2">
                  {hourEvents.length === 0 ? (
                    <div className="h-6"></div> // Empty space holder
                  ) : (
                    hourEvents.map(event => {
                      const childName = event.childId ? children.find(c => c.id === event.childId) : ""; // Updated comparison
                      
                      return (
                        <div key={event.id} className="flex items-start bg-card border rounded-md p-2">
                          <div className={`w-3 h-3 mt-1 rounded-full mr-3 ${getChildColor(event.childId)}`} />
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <h3 className="font-medium">{event.title}</h3>
                              <span className="text-sm text-muted-foreground">{event.time}</span>
                            </div>
                            <p className="text-sm">{event.location}</p>
                            {childName && <p className="text-xs font-medium">Criança: {childName}</p>}
                            {event.isRecurring && (
                              <p className="text-xs text-muted-foreground">Evento recorrente</p>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {dayEvents.length === 0 && (
        <div className="text-center py-4 text-muted-foreground">
          Não há eventos programados para este dia
        </div>
      )}
    </div>
  );
}
