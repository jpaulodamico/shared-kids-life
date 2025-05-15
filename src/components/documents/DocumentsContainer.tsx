
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { DocumentUploadDialog } from "@/components/documents/DocumentUploadDialog";
import { NewFolderDialog } from "@/components/documents/NewFolderDialog";
import { useToast } from "@/hooks/use-toast";
import { DocumentHeader } from "@/components/documents/DocumentHeader";
import { CategorySidebar } from "@/components/documents/CategorySidebar";
import { FolderList } from "@/components/documents/FolderList";
import { DocumentList } from "@/components/documents/DocumentList";

interface Document {
  id: number;
  name: string;
  category: string;
  uploadedBy: string;
  date: string;
  size: string;
  type: string;
}

interface Folder {
  id: number;
  name: string;
  count: number;
}

export const DocumentsContainer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [documents, setDocuments] = useState<Document[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isNewFolderDialogOpen, setIsNewFolderDialogOpen] = useState(false);
  const { toast } = useToast();
  
  // Generate categories from documents
  const categories = [
    { name: "Todos", count: documents.length },
    { name: "Escola", count: documents.filter(doc => doc.category === "Escola").length },
    { name: "Saúde", count: documents.filter(doc => doc.category === "Saúde").length },
    { name: "Atividades", count: documents.filter(doc => doc.category === "Atividades").length },
    { name: "Outros", count: documents.filter(doc => !["Escola", "Saúde", "Atividades"].includes(doc.category)).length }
  ];
  
  const filteredDocuments = documents.filter(doc => 
    (activeCategory === "Todos" || doc.category === activeCategory) &&
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUploadDocument = (newDoc: {
    name: string;
    category: string;
    file: string;
    size: string;
    type: string;
  }) => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getFullYear()}`;
    
    const newDocument = {
      id: documents.length + 1,
      name: newDoc.name,
      category: newDoc.category,
      uploadedBy: "Você",
      date: formattedDate,
      size: newDoc.size,
      type: newDoc.type
    };

    setDocuments([newDocument, ...documents]);
    
    toast({
      title: "Documento adicionado",
      description: `${newDoc.name} foi adicionado com sucesso.`
    });
  };

  const handleCreateFolder = (folderName: string) => {
    const newFolder = {
      id: folders.length + 1,
      name: folderName,
      count: 0
    };

    setFolders([...folders, newFolder]);
    
    toast({
      title: "Pasta criada",
      description: `A pasta ${folderName} foi criada com sucesso.`
    });
  };
  
  return (
    <div className="space-y-6">
      <DocumentHeader 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onNewFolderClick={() => setIsNewFolderDialogOpen(true)}
        onUploadClick={() => setIsUploadDialogOpen(true)}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Categorias</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <CategorySidebar 
              categories={categories} 
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Arquivos</CardTitle>
            <CardDescription>
              {filteredDocuments.length} documento(s) encontrado(s)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FolderList folders={folders} />
            <DocumentList documents={filteredDocuments} />
          </CardContent>
        </Card>
      </div>

      {/* Dialogs */}
      <DocumentUploadDialog
        open={isUploadDialogOpen}
        onClose={() => setIsUploadDialogOpen(false)}
        onUpload={handleUploadDocument}
      />
      
      <NewFolderDialog
        open={isNewFolderDialogOpen}
        onClose={() => setIsNewFolderDialogOpen(false)}
        onCreateFolder={handleCreateFolder}
      />
    </div>
  );
};
