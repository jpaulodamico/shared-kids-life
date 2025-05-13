
import { useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Contact, Message } from "./types";
import { Image, FileText, FileVideo, FileAudio } from "lucide-react";

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

  const renderAttachment = (message: Message) => {
    if (!message.attachment) return null;
    
    switch (message.attachment.type) {
      case 'image':
        return (
          <div className="mt-2 rounded-md overflow-hidden">
            <img 
              src={message.attachment.url} 
              alt={message.attachment.name}
              className="max-w-full max-h-[200px] object-contain"
            />
          </div>
        );
      case 'audio':
        return (
          <div className="mt-2">
            <audio controls className="max-w-full">
              <source src={message.attachment.url} />
              Seu navegador não suporta a reprodução de áudio.
            </audio>
          </div>
        );
      case 'video':
        return (
          <div className="mt-2">
            <video controls className="max-w-full max-h-[200px]">
              <source src={message.attachment.url} />
              Seu navegador não suporta a reprodução de vídeo.
            </video>
          </div>
        );
      default:
        return (
          <a 
            href={message.attachment.url} 
            download={message.attachment.name}
            className="mt-2 p-2 bg-background rounded flex items-center gap-2 hover:bg-accent transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FileText className="h-4 w-4" />
            <span className="text-xs truncate">{message.attachment.name}</span>
          </a>
        );
    }
  };

  const getAttachmentIcon = (type: string) => {
    switch (type) {
      case 'image': return <Image className="h-4 w-4" />;
      case 'audio': return <FileAudio className="h-4 w-4" />;
      case 'video': return <FileVideo className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
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
              {message.text && <p className="text-sm">{message.text}</p>}
              {message.attachment && renderAttachment(message)}
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
