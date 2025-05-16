
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format, addWeeks, subWeeks, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, isSameMonth } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CalendarEvent, EventType } from "@/pages/Calendar";
import { cn } from "@/lib/utils";
import { children } from "@/data/childrenData";

interface WeekViewProps {
  date: Date;
  events: CalendarEvent[];
  onSelectDate: (date: Date) => void;
  getBackgroundColor: (type: EventType) => string;
  getChildColor: (childId?: string) => string; // Updated: Changed from number to string
}

export function WeekView({
  date,
  events,
  onSelectDate,
  getBackgroundColor,
  getChildColor
}: WeekViewProps) {
  // Get days of the week
  const weekStart = startOfWeek(date, { weekStartsOn: 0 }); // 0 for Sunday
  const weekEnd = endOfWeek(date, { weekStartsOn: 0 });
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onSelectDate(subWeeks(date, 1))}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <h2 className="text-xl font-bold">
          {format(weekStart, "d", { locale: ptBR })} - {format(weekEnd, "d 'de' MMMM 'de' yyyy", { locale: ptBR })}
        </h2>
        
        <Button
          variant="outline"
          size="icon"
          onClick={() => onSelectDate(addWeeks(date, 1))}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => (
          <div 
            key={index} 
            className={cn(
              "text-center py-1 font-medium",
              isSameMonth(day, date) ? "" : "text-muted-foreground"
            )}
          >
            {format(day, "E", { locale: ptBR })}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => {
          const dayEvents = events.filter(event => isSameDay(event.date, day));
          
          return (
            <Card 
              key={index} 
              className={cn(
                "min-h-[120px] cursor-pointer transition",
                isSameDay(day, date) ? "border-primary" : "",
                isSameMonth(day, date) ? "" : "bg-muted/20"
              )}
              onClick={() => onSelectDate(day)}
            >
              <CardHeader className="p-2">
                <CardTitle className={cn(
                  "text-sm text-center",
                  isSameDay(day, new Date()) ? "text-primary font-bold" : ""
                )}>
                  {format(day, "d", { locale: ptBR })}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-1 space-y-1 overflow-y-auto max-h-[80px]">
                {dayEvents.map(event => (
                  <div 
                    key={event.id}
                    className={cn(
                      "text-xs p-1 rounded truncate",
                      getChildColor(event.childId),
                    )}
                    title={`${event.title} - ${event.time} - ${event.childId ? children.find(c => c.id === event.childId)?.name : 'Evento geral'}`} // Fixed comparison
                  >
                    {event.time} {event.title}
                  </div>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Eventos em {format(date, "d 'de' MMMM", { locale: ptBR })}</CardTitle>
        </CardHeader>
        <CardContent>
          {events.filter(event => isSameDay(event.date, date)).length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">
              Não há eventos programados para este dia
            </div>
          ) : (
            <div className="space-y-4">
              {events
                .filter(event => isSameDay(event.date, date))
                .map((event) => {
                  const childName = event.childId ? children.find(c => c.id === event.childId)?.name : ""; // Fixed comparison
                  
                  return (
                    <div key={event.id} className="flex items-start">
                      <div className={`w-3 h-3 mt-1.5 rounded-full mr-3 ${getChildColor(event.childId)}`} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{event.title}</h3>
                          <span className="text-sm text-muted-foreground">{event.time}</span>
                        </div>
                        <p className="text-sm">{event.description}</p>
                        <p className="text-sm text-muted-foreground">{event.location}</p>
                        {childName && <p className="text-xs font-medium">Criança: {childName}</p>}
                        {event.isRecurring && (
                          <p className="text-xs text-muted-foreground">Evento recorrente</p>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
