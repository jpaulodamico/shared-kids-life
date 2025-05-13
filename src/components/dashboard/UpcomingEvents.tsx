
import { Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Sample data
const events = [
  {
    id: 1,
    title: "Consulta Pediatra",
    date: "Hoje, 14:30",
    description: "Dra. Ana Silva",
    type: "medical"
  },
  {
    id: 2,
    title: "Reunião Escolar",
    date: "Amanhã, 10:00",
    description: "Escola Miraflores",
    type: "school"
  },
  {
    id: 3,
    title: "Aula de Natação",
    date: "18/05, 16:00",
    description: "Academia Central",
    type: "activity"
  },
  {
    id: 4,
    title: "Visita Avós",
    date: "19/05, 11:00",
    description: "Casa dos avós",
    type: "family"
  }
];

export function UpcomingEvents() {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Próximos Eventos</CardTitle>
          <CardDescription>Compromissos para os próximos dias</CardDescription>
        </div>
        <Calendar className="w-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className="flex items-start">
              <div className={`w-2 h-2 mt-2 rounded-full mr-3 ${
                event.type === "medical" 
                  ? "bg-destructive" 
                  : event.type === "school" 
                  ? "bg-family-600" 
                  : event.type === "activity"
                  ? "bg-accent-green-500"
                  : "bg-warm-500"
              }`} />
              <div className="flex-1">
                <h3 className="text-sm font-medium">{event.title}</h3>
                <p className="text-xs text-muted-foreground">{event.date}</p>
                <p className="text-xs">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
