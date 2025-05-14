
import { CalendarClock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { children } from "@/data/childrenData";
import { cn } from "@/lib/utils";

// Child color mapping (should match the one in Calendar.tsx)
const CHILD_COLORS: Record<string, string> = {
  "sofia": "bg-purple-500 text-white", // Sofia - purple
  "lucas": "bg-blue-500 text-white",   // Lucas - blue
};

// Sample data
const allEvents = [
  {
    id: 1,
    title: "Consulta Médica",
    date: "Amanhã às 14:00",
    location: "Clínica Pediátrica",
    type: "health",
    childId: "sofia"
  },
  {
    id: 2,
    title: "Reunião Escolar",
    date: "Segunda-feira às 10:00",
    location: "Escola Miraflores",
    type: "education",
    childId: "sofia"
  },
  {
    id: 3,
    title: "Aula de Natação",
    date: "Quarta-feira às 16:30",
    location: "Academia Splash",
    type: "activity",
    childId: "lucas"
  },
  {
    id: 4,
    title: "Festa de Aniversário",
    date: "Sábado às 15:00",
    location: "Buffet Infantil Alegria",
    type: "social",
    childId: "lucas"
  }
];

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
          <p className="text-sm text-muted-foreground">Não há eventos agendados.</p>
        )}
        <div className="mt-4 pt-4 border-t">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate("/calendar")}
          >
            Ver calendário completo
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
