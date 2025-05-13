
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, MapPin, Edit } from "lucide-react";

interface ProfileCardProps {
  user: {
    name: string;
    email: string;
    phone?: string;
    address?: string;
    role: string;
    avatarUrl?: string;
    initials: string;
  };
  onEdit: () => void;
}

export function ProfileCard({ user, onEdit }: ProfileCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-col items-center text-center pb-2">
        <Avatar className="w-24 h-24 mb-4">
          {user.avatarUrl ? (
            <AvatarImage src={user.avatarUrl} alt={user.name} />
          ) : (
            <AvatarFallback className="bg-family-100 text-family-700 text-3xl">
              {user.initials}
            </AvatarFallback>
          )}
        </Avatar>
        <CardTitle className="text-2xl mb-1">{user.name}</CardTitle>
        <span className="px-3 py-1 text-xs rounded-full bg-family-100 text-family-700 mb-4">
          {user.role === "parent" ? "Responsável Principal" : "Responsável Secundário"}
        </span>
        <Button 
          onClick={onEdit} 
          variant="outline" 
          size="sm"
          className="absolute top-4 right-4"
        >
          <Edit className="h-4 w-4 mr-1" />
          Editar
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center">
          <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
          <span>{user.email}</span>
        </div>
        {user.phone && (
          <div className="flex items-center">
            <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{user.phone}</span>
          </div>
        )}
        {user.address && (
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{user.address}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
