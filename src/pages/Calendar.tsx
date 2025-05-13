
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Sample events data
  const events = [
    {
      id: 1,
      title: "Consulta Pediatra",
      date: new Date(2025, 4, 13), // Current date
      time: "14:30",
      description: "Dra. Ana Silva",
      type: "medical",
      location: "Clínica Central"
    },
    {
      id: 2,
      title: "Reunião Escolar",
      date: new Date(2025, 4, 14), // Tomorrow
      time: "10:00",
      description: "Avaliação Semestral",
      type: "school",
      location: "Escola Miraflores"
    },
    {
      id: 3,
      title: "Aula de Natação",
      date: new Date(2025, 4, 18),
      time: "16:00",
      description: "Levar toalha e troca de roupa",
      type: "activity",
      location: "Academia Central"
    },
    {
      id: 4,
      title: "Visita Avós",
      date: new Date(2025, 4, 19),
      time: "11:00",
      description: "Almoço em família",
      type: "family",
      location: "Casa dos avós"
    }
  ];

  // Filter events for the selected date
  const selectedDateEvents = events.filter(
    (event) => 
      date && 
      event.date.getDate() === date.getDate() && 
      event.date.getMonth() === date.getMonth() && 
      event.date.getFullYear() === date.getFullYear()
  );

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Calendário</h1>
        <p className="text-muted-foreground">
          Gerencie os compromissos e eventos das crianças
        </p>
      </div>

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
              onSelect={setDate}
              className="rounded-md border w-full"
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
                    <div className={`w-3 h-3 mt-1.5 rounded-full mr-3 ${
                      event.type === "medical" 
                        ? "bg-destructive" 
                        : event.type === "school" 
                        ? "bg-family-600" 
                        : event.type === "activity"
                        ? "bg-accent-green-500"
                        : "bg-warm-500"
                    }`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{event.title}</h3>
                        <span className="text-sm text-muted-foreground">{event.time}</span>
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
    </div>
  );
};

export default CalendarPage;
