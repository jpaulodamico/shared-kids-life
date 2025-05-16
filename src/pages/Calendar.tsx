import { useState, useCallback, useEffect } from 'react';
import { Calendar as CalendarUI } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { MonthView } from '@/components/calendar/MonthView';
import { DayView } from '@/components/calendar/DayView';
import { EventList } from '@/components/calendar/EventList';
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast";
import { useChildren } from "@/hooks/use-supabase-data";
import { cn } from "@/lib/utils";

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  date: Date;
  time: string;
  type: EventType;
  location?: string;
  childId?: string;
  isRecurring?: boolean;
  recurrencePattern?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  endRecurrenceDate?: Date | null;
}

export type EventType = 'school' | 'health' | 'medical' | 'activity' | 'family' | 'other';

const CalendarPage = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [view, setView] = useState<'month' | 'day'>('month');
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('08:00');
  const [type, setType] = useState<EventType>('school');
  const [location, setLocation] = useState('');
  const [childId, setChildId] = useState<string | undefined>(undefined);
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurrencePattern, setRecurrencePattern] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('weekly');
  const { toast } = useToast();
  const { children } = useChildren();

  useEffect(() => {
    // Mock events for testing
    const mockEvents: CalendarEvent[] = [
      {
        id: '1',
        title: 'Reunião Escolar',
        description: 'Reunião com os pais na escola',
        date: new Date(),
        time: '10:00',
        type: 'school',
        location: 'Escola Municipal',
        childId: children[0]?.id,
        isRecurring: false,
      },
      {
        id: '2',
        title: 'Consulta Médica',
        description: 'Consulta de rotina com o pediatra',
        date: new Date(),
        time: '14:00',
        type: 'health',
        location: 'Consultório Médico',
        childId: children[0]?.id,
        isRecurring: true,
        recurrencePattern: 'weekly',
      },
      {
        id: '3',
        title: 'Aula de Natação',
        description: 'Aula de natação na piscina do clube',
        date: new Date(),
        time: '16:00',
        type: 'activity',
        location: 'Clube Aquático',
        childId: children[0]?.id,
        isRecurring: true,
        recurrencePattern: 'weekly',
      },
    ];

    setEvents(mockEvents);
  }, [children]);

  const formatDate = useCallback((date: Date) => {
    return format(date, "PPPP", { locale: ptBR });
  }, []);

  const handleSelectDate = (date: Date) => {
    setDate(date);
  };

  const getBackgroundColor = useCallback((type: EventType) => {
    switch (type) {
      case 'school':
        return 'bg-red-500';
      case 'health':
        return 'bg-green-500';
      case 'activity':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  }, []);

  const getChildColor = useCallback((childId?: string) => {
    if (!childId) return 'bg-gray-400';
    
    const index = children.findIndex(child => child.id === childId);
    if (index === -1) return 'bg-gray-400';
    
    const colors = [
      'bg-blue-500',
      'bg-red-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-orange-500',
    ];
    
    return colors[index % colors.length];
  }, [children]);

  const selectedDateEvents = events.filter(event => {
    return event.date.toDateString() === date.toDateString();
  });

  const handleCreateEvent = () => {
    if (!title || !time || !type) {
      toast({
        title: "Erro ao criar evento",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    const newEvent: CalendarEvent = {
      id: Math.random().toString(36).substring(7),
      title,
      description,
      date,
      time,
      type,
      location,
      childId,
      isRecurring,
      recurrencePattern,
    };

    setEvents([...events, newEvent]);
    setOpen(false);
    setTitle('');
    setDescription('');
    setTime('08:00');
    setType('school');
    setLocation('');
    setChildId(undefined);
    setIsRecurring(false);
    setRecurrencePattern('weekly');

    toast({
      title: "Evento criado",
      description: "Seu evento foi criado com sucesso.",
    });
  };

  return (
    <div className="container py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Calendário</h1>
        <div className="space-x-2">
          <Button variant="outline" onClick={() => setView(view === 'month' ? 'day' : 'month')}>
            Alternar para visão {view === 'month' ? 'diária' : 'mensal'}
          </Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusIcon className="mr-2 h-4 w-4" />
                Criar Evento
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Criar Evento</DialogTitle>
                <DialogDescription>
                  Crie um novo evento para o seu calendário.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Título
                  </Label>
                  <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Descrição
                  </Label>
                  <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">
                    Data
                  </Label>
                  <Card className="col-span-3">
                    <CardContent className="grid gap-4 p-2">
                      <CalendarUI
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border"
                      />
                    </CardContent>
                  </Card>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="time" className="text-right">
                    Hora
                  </Label>
                  <Input type="time" id="time" value={time} onChange={(e) => setTime(e.target.value)} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    Tipo
                  </Label>
                  <Select onValueChange={(value) => setType(value as EventType)}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Selecione um tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="school">Escola</SelectItem>
                      <SelectItem value="health">Saúde</SelectItem>
                      <SelectItem value="medical">Medicina</SelectItem>
                      <SelectItem value="activity">Atividade</SelectItem>
                      <SelectItem value="family">Família</SelectItem>
                      <SelectItem value="other">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">
                    Localização
                  </Label>
                  <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="child" className="text-right">
                    Criança
                  </Label>
                  <Select onValueChange={(value) => setChildId(value)}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Selecione uma criança" />
                    </SelectTrigger>
                    <SelectContent>
                      {children.map((child) => (
                        <SelectItem key={child.id} value={child.id}>{child.name}</SelectItem>
                      ))}
                      <SelectItem value={undefined}>Nenhuma</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="isRecurring" className="text-right">
                    Recorrente
                  </Label>
                  <Input type="checkbox" id="isRecurring" checked={isRecurring} onChange={(e) => setIsRecurring(e.target.checked)} className="col-span-3" />
                </div>
                {isRecurring && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="recurrencePattern" className="text-right">
                      Repetição
                    </Label>
                    <Select onValueChange={(value) => setRecurrencePattern(value as 'daily' | 'weekly' | 'monthly' | 'yearly')}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Selecione uma repetição" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Diariamente</SelectItem>
                        <SelectItem value="weekly">Semanalmente</SelectItem>
                        <SelectItem value="monthly">Mensalmente</SelectItem>
                        <SelectItem value="yearly">Anualmente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
              <Button onClick={handleCreateEvent}>Criar Evento</Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {view === 'month' ? (
        <MonthView
          date={date}
          events={events}
          onSelectDate={handleSelectDate}
          selectedDateEvents={selectedDateEvents}
          formatDate={formatDate}
          getBackgroundColor={getBackgroundColor}
          getChildColor={getChildColor}
        />
      ) : (
        <DayView
          date={date}
          events={events}
          onSelectDate={handleSelectDate}
          getBackgroundColor={getBackgroundColor}
          getChildColor={getChildColor}
        />
      )}
    </div>
  );
};

export default CalendarPage;

export const CHILD_COLORS: Record<string, string> = {
  // Cores padrão para IDs de crianças específicos
  // Estas cores serão usadas no componente ChildSelector
};
