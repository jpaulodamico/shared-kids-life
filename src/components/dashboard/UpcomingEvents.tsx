
import { CalendarClock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

// Child color mapping (should match the one in Calendar.tsx)
const CHILD_COLORS: Record<string, string> = {
  "sofia": "bg-purple-500 text-white", // Sofia - purple
  "lucas": "bg-blue-500 text-white",   // Lucas - blue
};

// Empty events array - removing test data
const allEvents = [];

const getBadgeVariant = (type: string) => {
  switch (type) {
    case "health": return "destructive";
    case "education": return "default";
    case "activity": return "secondary";
    case "social": return "outline";
    default: return "outline";
  }
};

interface UpcomingEventsProps {
  selectedChildId?: string;
}

export function UpcomingEvents({ selectedChildId = "all" }: UpcomingEventsProps) {
  const navigate = useNavigate();
  
  // Filtra os eventos com base na criança selecionada
  const events = selectedChildId === "all"
    ? allEvents
    : allEvents.filter(event => event.childId === selectedChildId);
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Próximos Eventos</CardTitle>
          <CardDescription>Eventos agendados para as crianças</CardDescription>
        </div>
        <CalendarClock className="w-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {events.length > 0 ? (
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="flex items-start gap-4">
                <div className={cn(
                  "w-2 h-2 mt-2 rounded-full", 
                  CHILD_COLORS[event.childId] || "bg-gray-300"
                )} />
                <div>
                  <h3 className="font-medium">{event.title}</h3>
                  <p className="text-sm text-muted-foreground">{event.date}</p>
                  <p className="text-xs text-muted-foreground">{event.location}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center">
            <CalendarClock className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-muted-foreground">Nenhum evento agendado.</p>
            <p className="text-sm text-muted-foreground/70">
              Adicione eventos no calendário para visualizá-los aqui.
            </p>
          </div>
        )}
        <div className="mt-4 pt-4 border-t">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate("/app/calendar")}
          >
            Ir para Calendário
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
