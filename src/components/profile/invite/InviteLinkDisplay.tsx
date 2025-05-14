
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface InviteLinkDisplayProps {
  inviteLink: string;
}

export function InviteLinkDisplay({ inviteLink }: InviteLinkDisplayProps) {
  if (!inviteLink) return null;
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink)
      .then(() => {
        toast.success("Link copiado para a área de transferência");
      })
      .catch(() => {
        toast.error("Erro ao copiar o link");
      });
  };

  const shareViaWhatsApp = () => {
    const whatsappText = encodeURIComponent(`Olá! Convido você a participar do CoParent. Use este link para se juntar: ${inviteLink}`);
    const whatsappUrl = `https://wa.me/?text=${whatsappText}`;
    window.open(whatsappUrl, '_blank');
  };
  
  return (
    <div className="mt-6 p-4 border rounded-md bg-muted">
      <h3 className="font-medium mb-2">Link de convite gerado:</h3>
      <div className="flex items-center gap-2">
        <Input 
          value={inviteLink} 
          readOnly 
          className="flex-1 text-sm font-mono bg-white"
        />
        <Button onClick={handleCopyLink} size="sm" variant="outline">
          <Copy className="h-4 w-4 mr-1" />
          Copiar
        </Button>
      </div>
      <div className="mt-4 text-sm text-muted-foreground">
        <p className="mb-2">Compartilhe este link com o familiar para que ele possa se juntar à aplicação.</p>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            className="flex items-center gap-1 text-sm"
            onClick={shareViaWhatsApp}
          >
            <ExternalLink className="h-4 w-4" />
            Compartilhar via WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
}
