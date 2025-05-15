
import { FolderPlus, Search, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DocumentHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onNewFolderClick: () => void;
  onUploadClick: () => void;
}

export const DocumentHeader = ({
  searchTerm,
  onSearchChange,
  onNewFolderClick,
  onUploadClick
}: DocumentHeaderProps) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Documentos</h1>
          <p className="text-muted-foreground">
            Armazene e compartilhe documentos importantes
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="gap-1"
            onClick={onNewFolderClick}
          >
            <FolderPlus className="h-4 w-4" />
            Nova Pasta
          </Button>
          <Button 
            className="gap-1"
            onClick={onUploadClick}
          >
            <Upload className="h-4 w-4" />
            Upload
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar documentos..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
    </>
  );
};
