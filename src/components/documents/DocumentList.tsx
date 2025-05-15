
import { FileText } from "lucide-react";

interface Document {
  id: number;
  name: string;
  category: string;
  uploadedBy: string;
  date: string;
  size: string;
  type: string;
}

interface DocumentListProps {
  documents: Document[];
}

export const DocumentList = ({ documents }: DocumentListProps) => {
  if (documents.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        Nenhum documento encontrado
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {documents.map((doc) => (
        <div 
          key={doc.id}
          className="flex items-center p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
        >
          <FileText className="h-8 w-8 text-family-600 mr-3" />
          <div className="flex-1 min-w-0">
            <h3 className="font-medium truncate">{doc.name}</h3>
            <div className="flex gap-2 text-sm text-muted-foreground">
              <span>{doc.category}</span>
              <span>•</span>
              <span>Enviado por {doc.uploadedBy}</span>
              <span>•</span>
              <span>{doc.date}</span>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">{doc.size}</div>
        </div>
      ))}
    </div>
  );
};
