
import { useState } from "react";
import { toast } from "sonner";
import ContactsList from "@/components/messages/ContactsList";
import ConversationWindow from "@/components/messages/ConversationWindow";
import MessageInput from "@/components/messages/MessageInput";
import { Contact, Message } from "@/components/messages/types";

// Empty contacts array - removing test data
const contacts: Contact[] = [];

const MessagesPage = () => {
  const [activeContact, setActiveContact] = useState<Contact | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  // Handle contact change
  const handleContactChange = (contact: Contact) => {
    // Mark messages as read
    const updatedContacts = contacts.map(c => {
      if (c.id === contact.id) {
        return {
          ...c,
          unread: 0
        };
      }
      return c;
    });
    
    setActiveContact(contact);
  };

  // Handle sending a new message
  const handleSendMessage = (
    text: string, 
    attachment?: { type: 'image' | 'document' | 'audio' | 'video', url: string, name: string }
  ) => {
    if (!activeContact) {
      toast.error("Selecione um contato primeiro");
      return;
    }
    
    // Create the new message object
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    
    const newMessageObj: Message = {
      id: messages.length + 1,
      senderId: "me",
      text: text,
      timestamp: `${hours}:${minutes}`,
      attachment: attachment
    };
    
    // Add the new message to the messages array
    setMessages([...messages, newMessageObj]);
    
    // Update the last message for the active contact
    const updatedContacts = contacts.map(contact => {
      if (contact.id === activeContact.id) {
        return {
          ...contact,
          lastMessage: attachment 
            ? `${text || "Enviou um ${getAttachmentTypeText(attachment.type)}"}`
            : text,
          time: "Agora"
        };
      }
      return contact;
    });
    
    // Show success toast
    toast.success(attachment ? "Mensagem e arquivo enviados" : "Mensagem enviada");
  };

  const getAttachmentTypeText = (type: string) => {
    switch (type) {
      case 'image': return 'imagem';
      case 'audio': return 'áudio';
      case 'video': return 'vídeo';
      default: return 'arquivo';
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
        <ContactsList 
          contacts={contacts} 
          activeContact={activeContact} 
          onContactChange={handleContactChange} 
        />
        
        <div className="lg:col-span-2 flex flex-col">
          {activeContact ? (
            <>
              <ConversationWindow 
                activeContact={activeContact} 
                messages={messages} 
              />
              <MessageInput onSendMessage={handleSendMessage} />
            </>
          ) : (
            <div className="h-full flex items-center justify-center bg-background rounded-md border">
              <div className="text-center p-6">
                <h3 className="text-lg font-medium mb-2">Nenhum contato selecionado</h3>
                <p className="text-muted-foreground">
                  Selecione um contato para iniciar uma conversa ou adicione um novo contato.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
