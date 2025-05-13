
import { useState } from "react";
import { toast } from "sonner";
import ContactsList from "@/components/messages/ContactsList";
import ConversationWindow from "@/components/messages/ConversationWindow";
import MessageInput from "@/components/messages/MessageInput";
import { Contact, Message } from "@/components/messages/types";

// Sample data
const contacts: Contact[] = [
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

const MessagesPage = () => {
  const [activeContact, setActiveContact] = useState(contacts[0]);
  const [messages, setMessages] = useState<Message[]>([
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
  ]);

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
  const handleSendMessage = (text: string) => {
    // Create the new message object
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    
    const newMessageObj: Message = {
      id: messages.length + 1,
      senderId: "me",
      text: text,
      timestamp: `${hours}:${minutes}`
    };
    
    // Add the new message to the messages array
    setMessages([...messages, newMessageObj]);
    
    // Update the last message for the active contact
    const updatedContacts = contacts.map(contact => {
      if (contact.id === activeContact.id) {
        return {
          ...contact,
          lastMessage: text,
          time: "Agora"
        };
      }
      return contact;
    });
    
    // Show success toast
    toast.success("Mensagem enviada");
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
          <ConversationWindow 
            activeContact={activeContact} 
            messages={messages} 
          />
          <MessageInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
