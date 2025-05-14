
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ui/image-upload";
import { User, Mail, Phone, MapPin, Edit, Upload } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

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
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(user.avatarUrl);
  const [showImageUpload, setShowImageUpload] = useState(false);

  const handleImageChange = (imageDataUrl: string) => {
    setAvatarUrl(imageDataUrl);
    // In a real app, you would upload this to your server/storage
    toast("Imagem de perfil atualizada");
    setShowImageUpload(false);
  };

  const handleImageRemove = () => {
    setAvatarUrl(undefined);
    toast("Imagem de perfil removida");
  };

  return (
    <Card>
      <CardHeader className="flex flex-col items-center text-center pb-2">
        <div className="relative mb-4">
          <Avatar className="w-24 h-24">
            {avatarUrl ? (
              <AvatarImage src={avatarUrl} alt={user.name} />
            ) : (
              <AvatarFallback className="bg-family-100 text-family-700 text-3xl">
                {user.initials}
              </AvatarFallback>
            )}
          </Avatar>
          <Button 
            onClick={() => setShowImageUpload(!showImageUpload)}
            variant="outline" 
            size="icon"
            className="absolute -bottom-2 -right-2 rounded-full bg-muted h-8 w-8"
          >
            <Upload className="h-4 w-4" />
          </Button>
        </div>
        
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
      
      {showImageUpload && (
        <CardContent className="pt-4 pb-2">
          <ImageUpload
            value={avatarUrl}
            onChange={handleImageChange}
            onRemove={handleImageRemove}
          />
        </CardContent>
      )}
      
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
