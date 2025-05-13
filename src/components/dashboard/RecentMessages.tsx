
import { MessageSquare } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

// Sample data
const messages = [
  {
    id: 1,
    sender: "Lúcia Moreira",
    message: "Confira os documentos da escola que acabei de enviar.",
    time: "20 min atrás",
    read: false,
    initials: "LM",
  },
  {
    id: 2,
    sender: "Pedro Santos",
    message: "Posso buscar as crianças hoje mais cedo?",
    time: "2h atrás",
    read: true,
    initials: "PS",
  },
  {
    id: 3,
    sender: "Escola Miraflores",
    message: "Reunião de pais confirmada para a próxima semana.",
    time: "Ontem",
    read: true,
    initials: "EM",
  }
];

export function RecentMessages() {
  const navigate = useNavigate();
  
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Mensagens Recentes</CardTitle>
          <CardDescription>Suas comunicações mais recentes</CardDescription>
        </div>
        <MessageSquare className="w-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="flex gap-3">
              <Avatar>
                <AvatarFallback className="bg-family-100 text-family-700">
                  {message.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">{message.sender}</h3>
                  <span className="text-xs text-muted-foreground">{message.time}</span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-1">{message.message}</p>
              </div>
              {!message.read && (
                <div className="w-2 h-2 bg-family-500 rounded-full self-center"></div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate("/messages")}
          >
            Ver todas
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
