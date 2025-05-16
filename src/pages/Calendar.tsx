
import { CalendarIcon, FilePlus2, Filter } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { addDays, format, startOfWeek, startOfMonth, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, parse, isValid } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { EventList } from "@/components/calendar/EventList";
import { DayView } from "@/components/calendar/DayView";
import { WeekView } from "@/components/calendar/WeekView";
import { MonthView } from "@/components/calendar/MonthView";
import { EventForm } from "@/components/calendar/EventForm";
import { children } from "@/data/childrenData";
import { toast } from "@/components/ui/use-toast";

export type EventType = 'medical' | 'school' | 'activity' | 'family' | 'other';

export interface CalendarEvent {
  id: number;
  title: string;
  date: Date;
  time: string;
  description: string;
  type: EventType;
  location: string;
  isRecurring?: boolean;
  recurrencePattern?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  endRecurrenceDate?: Date;
  childId?: string; // Updated: Changed from number to string
}

// Child color mapping
export const CHILD_COLORS: Record<string, string> = { // Updated: Changed from number to string
  "1": "bg-purple-500 text-white", // Sofia
  "2": "bg-blue-500 text-white",   // Lucas
  // Add more children colors as needed
};

// Function to get background color based on childId
export const getChildColor = (childId?: string): string => { // Updated: Changed from number to string
  if (childId === undefined) return "bg-gray-300"; // Default color for events without a child
  return CHILD_COLORS[childId] || "bg-gray-300";
};

const CalendarPage = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: 1,
      title: "Consulta Pediatra",
      date: new Date(2025, 4, 13), // Current date
      time: "14:30",
      description: "Dra. Ana Silva",
      type: "medical",
      location: "Clínica Central",
      childId: "1" // Updated: Changed from number to string
    },
    {
      id: 2,
      title: "Reunião Escolar",
      date: new Date(2025, 4, 14), // Tomorrow
      time: "10:00",
      description: "Avaliação Semestral",
      type: "school",
      location: "Escola Miraflores",
      childId: "1" // Updated: Changed from number to string
    },
    {
      id: 3,
      title: "Aula de Natação",
      date: new Date(2025, 4, 18),
      time: "16:00",
      description: "Levar toalha e troca de roupa",
      type: "activity",
      location: "Academia Central",
      isRecurring: true,
      recurrencePattern: "weekly",
      childId: "2" // Updated: Changed from number to string
    },
    {
      id: 4,
      title: "Visita Avós",
      date: new Date(2025, 4, 19),
      time: "11:00",
      description: "Almoço em família",
      type: "family",
      location: "Casa dos avós",
      childId: "2" // Updated: Changed from number to string
    }
  ]);

  const [view, setView] = useState<'day' | 'week' | 'month'>('month');
  const [showDialog, setShowDialog] = useState(false);
  const [activeFilters, setActiveFilters] = useState<EventType[]>(['medical', 'school', 'activity', 'family', 'other']);
  
  // Filter events based on selected types
  const filteredEvents = events.filter(event => activeFilters.includes(event.type));

  // Filter events for the selected date
  const selectedDateEvents = filteredEvents.filter(
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

  const handleAddEvent = (event: Omit<CalendarEvent, "id">) => {
    const newEvent = {
      ...event,
      id: events.length + 1
    };
    setEvents([...events, newEvent]);
    setShowDialog(false);
    
    toast(`${newEvent.title} foi adicionado ao calendário.`);
  };

  const toggleFilter = (type: EventType) => {
    setActiveFilters(prev => {
      if (prev.includes(type)) {
        return prev.filter(t => t !== type);
      } else {
        return [...prev, type];
      }
    });
  };

  // Original type color function (kept for type-based coloring)
  const getBackgroundColor = (type: EventType) => {
    switch(type) {
      case "medical": return "bg-destructive";
      case "school": return "bg-family-600";
      case "activity": return "bg-accent-green-500";
      case "family": return "bg-warm-500";
      default: return "bg-muted";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Calendário</h1>
          <p className="text-muted-foreground">
            Gerencie os compromissos e eventos das crianças
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogTrigger asChild>
              <Button>
                <FilePlus2 className="mr-2 h-4 w-4" />
                Novo Evento
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Adicionar Novo Evento</DialogTitle>
                <DialogDescription>
                  Preencha os detalhes do evento abaixo.
                </DialogDescription>
              </DialogHeader>
              <EventForm onSubmit={handleAddEvent} />
            </DialogContent>
          </Dialog>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filtrar
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56">
              <div className="space-y-2">
                <h4 className="font-medium">Tipos de Evento</h4>
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant={activeFilters.includes('medical') ? "default" : "outline"}
                    className={cn(
                      "flex items-center gap-1",
                      activeFilters.includes('medical') ? "text-white" : ""
                    )}
                    onClick={() => toggleFilter('medical')}
                  >
                    <div className="w-2 h-2 rounded-full bg-destructive" />
                    Médico
                  </Button>
                  <Button
                    size="sm"
                    variant={activeFilters.includes('school') ? "default" : "outline"}
                    className={cn(
                      "flex items-center gap-1",
                      activeFilters.includes('school') ? "text-white" : ""
                    )}
                    onClick={() => toggleFilter('school')}
                  >
                    <div className="w-2 h-2 rounded-full bg-family-600" />
                    Escola
                  </Button>
                  <Button
                    size="sm"
                    variant={activeFilters.includes('activity') ? "default" : "outline"}
                    className={cn(
                      "flex items-center gap-1",
                      activeFilters.includes('activity') ? "text-white" : ""
                    )}
                    onClick={() => toggleFilter('activity')}
                  >
                    <div className="w-2 h-2 rounded-full bg-accent-green-500" />
                    Atividade
                  </Button>
                  <Button
                    size="sm"
                    variant={activeFilters.includes('family') ? "default" : "outline"}
                    className={cn(
                      "flex items-center gap-1",
                      activeFilters.includes('family') ? "text-white" : ""
                    )}
                    onClick={() => toggleFilter('family')}
                  >
                    <div className="w-2 h-2 rounded-full bg-warm-500" />
                    Família
                  </Button>
                  <Button
                    size="sm"
                    variant={activeFilters.includes('other') ? "default" : "outline"}
                    className={cn(
                      "flex items-center gap-1",
                      activeFilters.includes('other') ? "text-white" : ""
                    )}
                    onClick={() => toggleFilter('other')}
                  >
                    <div className="w-2 h-2 rounded-full bg-muted" />
                    Outro
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      <Tabs value={view} onValueChange={(v) => setView(v as 'day' | 'week' | 'month')} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="day">Dia</TabsTrigger>
          <TabsTrigger value="week">Semana</TabsTrigger>
          <TabsTrigger value="month">Mês</TabsTrigger>
        </TabsList>
        
        <TabsContent value="day" className="w-full">
          <DayView 
            date={date} 
            events={filteredEvents} 
            onSelectDate={setDate}
            getBackgroundColor={getBackgroundColor}
            getChildColor={getChildColor}
          />
        </TabsContent>
        
        <TabsContent value="week" className="w-full">
          <WeekView 
            date={date} 
            events={filteredEvents} 
            onSelectDate={setDate}
            getBackgroundColor={getBackgroundColor}
            getChildColor={getChildColor}
          />
        </TabsContent>
        
        <TabsContent value="month" className="w-full">
          <MonthView
            date={date}
            events={filteredEvents}
            onSelectDate={setDate}
            selectedDateEvents={selectedDateEvents}
            formatDate={formatDate}
            getBackgroundColor={getBackgroundColor}
            getChildColor={getChildColor}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CalendarPage;
