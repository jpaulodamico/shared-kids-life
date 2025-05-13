
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search } from "lucide-react";
import { Contact } from "./types";

interface ContactsListProps {
  contacts: Contact[];
  activeContact: Contact;
  onContactChange: (contact: Contact) => void;
}

const ContactsList = ({ contacts, activeContact, onContactChange }: ContactsListProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
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
              onClick={() => onContactChange(contact)}
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
  );
};

export default ContactsList;
