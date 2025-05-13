
import { useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Contact, Message } from "./types";

interface ConversationWindowProps {
  activeContact: Contact;
  messages: Message[];
}

const ConversationWindow = ({ activeContact, messages }: ConversationWindowProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Card className="flex-1 flex flex-col">
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
        {messages.map((message) => (
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
        <div ref={messagesEndRef} />
      </CardContent>
    </Card>
  );
};

export default ConversationWindow;
