
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface DocumentUploadDialogProps {
  open: boolean;
  onClose: () => void;
  onUpload: (document: {
    name: string;
    category: string;
    file: string;
    size: string;
    type: string;
  }) => void;
}

export const DocumentUploadDialog = ({
  open,
  onClose,
  onUpload,
}: DocumentUploadDialogProps) => {
  const [file, setFile] = useState<string>("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Escola");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!file) {
      toast({
        title: "Erro",
        description: "Por favor selecione um arquivo",
        variant: "destructive",
      });
      return;
    }

    if (!name) {
      toast({
        title: "Erro",
        description: "Por favor digite o nome do documento",
        variant: "destructive",
      });
      return;
    }

    // Get file extension from the base64 data
    let type = "pdf";
    if (file.includes("image/jpeg")) {
      type = "image";
    } else if (file.includes("image/png")) {
      type = "image";
    }

    // Estimate size (this would be more accurate with actual file)
    const fileSize = Math.round(file.length / 1000); // Rough estimation
    const size = `${fileSize > 1000 ? (fileSize / 1000).toFixed(1) + " MB" : fileSize + " KB"}`;

    onUpload({
      name: name.endsWith(`.${type}`) ? name : `${name}.${type}`,
      category,
      file,
      size,
      type,
    });

    // Reset form
    setFile("");
    setName("");
    setCategory("Escola");
    onClose();
  };

  const handleRemoveFile = () => {
    setFile("");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Upload de documento</DialogTitle>
            <DialogDescription>
              Faça o upload de um novo documento para a sua biblioteca
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <ImageUpload
                value={file}
                onChange={setFile}
                onRemove={handleRemoveFile}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Nome do documento</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Declaração escolar"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Categoria</Label>
              <select
                id="category"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Escola">Escola</option>
                <option value="Saúde">Saúde</option>
                <option value="Atividades">Atividades</option>
                <option value="Outros">Outros</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Upload</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
