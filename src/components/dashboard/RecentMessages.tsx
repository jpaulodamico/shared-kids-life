
import { MessageSquare } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Empty messages array - removing test data
const allMessages = [];

interface RecentMessagesProps {
  selectedChildId?: string;
}

export function RecentMessages({ selectedChildId = "all" }: RecentMessagesProps) {
  const navigate = useNavigate();
  
  // Filtra as mensagens com base na criança selecionada
  const messages = selectedChildId === "all"
    ? allMessages
    : allMessages.filter(msg => msg.childId === selectedChildId || msg.childId === "all");
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Mensagens Recentes</CardTitle>
          <CardDescription>Comunicação entre os responsáveis</CardDescription>
        </div>
        <MessageSquare className="w-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {messages.length > 0 ? (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className="flex items-start gap-4">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="text-xs">{msg.initials}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{msg.sender}</p>
                    {msg.unread && (
                      <Badge variant="secondary" className="h-5 px-1.5 text-xs">Novo</Badge>
                    )}
                  </div>
                  <p className="text-sm">{msg.message}</p>
                  <p className="text-xs text-muted-foreground">{msg.time}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center">
            <MessageSquare className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-muted-foreground">Nenhuma mensagem recente.</p>
            <p className="text-sm text-muted-foreground/70">
              Aqui será exibido o histórico de comunicação com outros responsáveis.
            </p>
          </div>
        )}
        <div className="mt-4 pt-4 border-t">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate("/app/messages")}
          >
            Ir para Mensagens
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
