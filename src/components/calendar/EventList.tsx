
import { CalendarEvent, EventType } from "@/pages/Calendar";
import { children } from "@/data/childrenData";

interface EventListProps {
  events: CalendarEvent[];
  getBackgroundColor: (type: EventType) => string;
  getChildColor: (childId?: string) => string; // Atualizado: Alterado de number para string
}

export function EventList({ events, getBackgroundColor, getChildColor }: EventListProps) {
  if (events.length === 0) {
    return (
      <div className="text-center py-6 text-muted-foreground">
        Não há eventos programados para esta data
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {events.map((event) => {
        const childName = event.childId ? children.find(c => c.id === event.childId)?.name : ""; // Corrigido comparação
        
        return (
          <div key={event.id} className="flex items-start">
            <div className={`w-3 h-3 mt-1.5 rounded-full mr-3 ${getChildColor(event.childId)}`} />
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
              {childName && <p className="text-xs font-medium">Criança: {childName}</p>}
              {event.isRecurring && event.recurrencePattern && (
                <p className="text-xs text-muted-foreground">
                  Repete: {event.recurrencePattern === 'daily' ? 'Diariamente' :
                    event.recurrencePattern === 'weekly' ? 'Semanalmente' :
                    event.recurrencePattern === 'monthly' ? 'Mensalmente' : 'Anualmente'}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
