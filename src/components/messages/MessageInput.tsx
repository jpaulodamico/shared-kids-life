
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, PaperclipIcon, X, Image, FileText, FileVideo, FileAudio } from "lucide-react";
import { toast } from "sonner";

interface MessageInputProps {
  onSendMessage: (text: string, attachment?: { type: 'image' | 'document' | 'audio' | 'video', url: string, name: string }) => void;
}

const MessageInput = ({ onSendMessage }: MessageInputProps) => {
  const [newMessage, setNewMessage] = useState("");
  const [attachment, setAttachment] = useState<{
    type: 'image' | 'document' | 'audio' | 'video';
    url: string;
    name: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = () => {
    if (newMessage.trim() || attachment) {
      onSendMessage(
        newMessage.trim(),
        attachment || undefined
      );
      setNewMessage("");
      setAttachment(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Arquivo muito grande. Máximo de 5MB permitido.");
      return;
    }

    // Determine file type
    let fileType: 'image' | 'document' | 'audio' | 'video' = 'document';
    if (file.type.startsWith('image/')) {
      fileType = 'image';
    } else if (file.type.startsWith('audio/')) {
      fileType = 'audio';
    } else if (file.type.startsWith('video/')) {
      fileType = 'video';
    }

    // Convert file to data URL
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setAttachment({
          type: fileType,
          url: event.target.result as string,
          name: file.name
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const removeAttachment = () => {
    setAttachment(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getAttachmentIcon = () => {
    switch (attachment?.type) {
      case 'image':
        return <Image className="h-4 w-4" />;
      case 'audio':
        return <FileAudio className="h-4 w-4" />;
      case 'video':
        return <FileVideo className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="p-4 border-t">
      {attachment && (
        <div className="mb-2 p-2 bg-muted rounded-md flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm overflow-hidden">
            {getAttachmentIcon()}
            <span className="truncate">{attachment.name}</span>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6" 
            onClick={removeAttachment}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      <div className="flex gap-2">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*,audio/*,video/*,.pdf,.doc,.docx,.xls,.xlsx,.txt"
        />
        <Button 
          size="icon" 
          variant="outline" 
          onClick={() => fileInputRef.current?.click()}
          type="button"
        >
          <PaperclipIcon className="h-4 w-4" />
        </Button>
        <Input
          placeholder="Digite sua mensagem..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <Button size="icon" onClick={handleSendMessage}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default MessageInput;
