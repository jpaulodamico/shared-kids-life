
import { CalendarEvent, EventType } from "@/pages/Calendar";

interface EventListProps {
  events: CalendarEvent[];
  getBackgroundColor: (type: EventType) => string;
}

export function EventList({ events, getBackgroundColor }: EventListProps) {
  if (events.length === 0) {
    return (
      <div className="text-center py-6 text-muted-foreground">
        Não há eventos programados para esta data
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {events.map((event) => (
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
            {event.isRecurring && event.recurrencePattern && (
              <p className="text-xs text-muted-foreground">
                Repete: {event.recurrencePattern === 'daily' ? 'Diariamente' :
                  event.recurrencePattern === 'weekly' ? 'Semanalmente' :
                  event.recurrencePattern === 'monthly' ? 'Mensalmente' : 'Anualmente'}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
