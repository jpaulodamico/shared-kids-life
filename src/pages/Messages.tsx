
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Send } from "lucide-react";
import { useState } from "react";

// Sample data
const contacts = [
  {
    id: 1,
    name: "Lúcia Moreira",
    lastMessage: "Confira os documentos da escola que acabei de enviar.",
    time: "20 min atrás",
    unread: 2,
    online: true,
    initials: "LM"
  },
  {
    id: 2,
    name: "Pedro Santos",
    lastMessage: "Posso buscar as crianças hoje mais cedo?",
    time: "2h atrás",
    unread: 0,
    online: false,
    initials: "PS"
  },
  {
    id: 3,
    name: "Escola Miraflores",
    lastMessage: "Reunião de pais confirmada para a próxima semana.",
    time: "Ontem",
    unread: 0,
    online: false,
    initials: "EM"
  }
];

// Sample messages for active conversation
const sampleMessages = [
  {
    id: 1,
    senderId: 1,
    text: "Bom dia! Precisamos resolver a inscrição da Sofia nas aulas de violão.",
    timestamp: "10:30"
  },
  {
    id: 2,
    senderId: "me",
    text: "Oi Lúcia! Sim, concordo. Você sabe quanto custa a mensalidade?",
    timestamp: "10:32"
  },
  {
    id: 3,
    senderId: 1,
    text: "R$ 150,00 por mês. A professora disse que as aulas são às terças e quintas, das 15h às 16h.",
    timestamp: "10:35"
  },
  {
    id: 4,
    senderId: "me",
    text: "Perfeito! Acho que vai se encaixar bem no horário dela. Podemos dividir o custo igualmente?",
    timestamp: "10:38"
  },
  {
    id: 5,
    senderId: 1,
    text: "Sim, claro. Vou fazer a inscrição amanhã e te envio o comprovante para dividirmos.",
    timestamp: "10:40"
  },
  {
    id: 6,
    senderId: 1,
    text: "Ah, também precisamos decidir sobre aqueles documentos da escola que te enviei.",
    timestamp: "10:41"
  }
];

const MessagesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeContact, setActiveContact] = useState(contacts[0]);
  const [newMessage, setNewMessage] = useState("");
  
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sendMessage = () => {
    if (newMessage.trim()) {
      // Here you would normally add the message to your state or database
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Mensagens</h1>
        <p className="text-muted-foreground">
          Comunique-se com outros responsáveis e contatos importantes
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-220px)]">
        <Card className="lg:col-span-1 flex flex-col">
          <CardHeader className="pb-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar contatos..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto p-0">
            <div className="px-4 py-2 space-y-1">
              {filteredContacts.map((contact) => (
                <div 
                  key={contact.id}
                  className={`flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-muted ${
                    activeContact.id === contact.id ? "bg-muted" : ""
                  }`}
                  onClick={() => setActiveContact(contact)}
                >
                  <div className="relative">
                    <Avatar>
                      <AvatarFallback className="bg-family-100 text-family-700">
                        {contact.initials}
                      </AvatarFallback>
                    </Avatar>
                    {contact.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-accent-green-500 rounded-full border-2 border-background"></span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <h3 className="font-medium truncate">{contact.name}</h3>
                      <span className="text-xs text-muted-foreground">{contact.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{contact.lastMessage}</p>
                  </div>
                  {contact.unread > 0 && (
                    <div className="min-w-5 h-5 rounded-full bg-family-500 text-white text-xs flex items-center justify-center">
                      {contact.unread}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 flex flex-col">
          <CardHeader className="border-b pb-3">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback className="bg-family-100 text-family-700">
                  {activeContact.initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{activeContact.name}</CardTitle>
                <CardDescription>
                  {activeContact.online ? "Online" : "Última vez " + activeContact.time}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto py-4 px-4 space-y-4">
            {sampleMessages.map((message) => (
              <div 
                key={message.id}
                className={`flex ${message.senderId === "me" ? "justify-end" : "justify-start"}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.senderId === "me" 
                      ? "bg-family-100 text-family-950" 
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <span className="text-xs text-muted-foreground block text-right mt-1">
                    {message.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Digite sua mensagem..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <Button size="icon" onClick={sendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MessagesPage;
