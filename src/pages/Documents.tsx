
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, FolderPlus, Search, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

// Sample data
const documents = [
  {
    id: 1,
    name: "Declaração Escolar.pdf",
    category: "Escola",
    uploadedBy: "Lúcia Moreira",
    date: "10/05/2025",
    size: "1.2 MB",
    type: "pdf"
  },
  {
    id: 2,
    name: "Receita médica - Sofia.jpg",
    category: "Saúde",
    uploadedBy: "Você",
    date: "08/05/2025",
    size: "850 KB",
    type: "image"
  },
  {
    id: 3,
    name: "Comprovante de matrícula natação.pdf",
    category: "Atividades",
    uploadedBy: "Lúcia Moreira",
    date: "05/05/2025",
    size: "450 KB",
    type: "pdf"
  },
  {
    id: 4,
    name: "Carteira de vacinação - Lucas.pdf",
    category: "Saúde",
    uploadedBy: "Você",
    date: "01/05/2025",
    size: "1.5 MB",
    type: "pdf"
  },
  {
    id: 5,
    name: "Calendário escolar 2025.pdf",
    category: "Escola",
    uploadedBy: "Lúcia Moreira",
    date: "20/04/2025",
    size: "2.1 MB",
    type: "pdf"
  }
];

// Categories
const categories = [
  { name: "Todos", count: documents.length },
  { name: "Escola", count: documents.filter(doc => doc.category === "Escola").length },
  { name: "Saúde", count: documents.filter(doc => doc.category === "Saúde").length },
  { name: "Atividades", count: documents.filter(doc => doc.category === "Atividades").length },
  { name: "Outros", count: documents.filter(doc => !["Escola", "Saúde", "Atividades"].includes(doc.category)).length }
];

const DocumentsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");
  
  const filteredDocuments = documents.filter(doc => 
    (activeCategory === "Todos" || doc.category === activeCategory) &&
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Documentos</h1>
          <p className="text-muted-foreground">
            Armazene e compartilhe documentos importantes
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-1">
            <FolderPlus className="h-4 w-4" />
            Nova Pasta
          </Button>
          <Button className="gap-1">
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
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Categorias</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div>
              {categories.map((category) => (
                <button
                  key={category.name}
                  className={`w-full flex justify-between items-center px-4 py-2 text-left hover:bg-muted ${
                    activeCategory === category.name ? "bg-muted" : ""
                  }`}
                  onClick={() => setActiveCategory(category.name)}
                >
                  <span>{category.name}</span>
                  <span className="text-sm bg-muted rounded-full px-2 py-0.5">
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
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
            {filteredDocuments.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground">
                Nenhum documento encontrado
              </div>
            ) : (
              <div className="space-y-2">
                {filteredDocuments.map((doc) => (
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
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DocumentsPage;
