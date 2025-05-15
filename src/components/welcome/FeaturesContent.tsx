
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MessageSquare, DollarSign, FileText, Users } from "lucide-react";

export function FeaturesContent() {
  return (
    <div className="mt-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-family-500" />
              Calendário Compartilhado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base">
              Organize eventos, consultas médicas, atividades escolares e compromissos importantes. 
              Todos os responsáveis ficam informados sobre a programação das crianças.
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-accent-green-500" />
              Mensagens
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base">
              Comunique-se de forma organizada sobre assuntos relacionados às crianças.
              Mantenha todas as conversas importantes em um lugar seguro.
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-warm-500" />
              Controle de Despesas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base">
              Registre e compartilhe gastos relacionados às crianças.
              Acompanhe despesas médicas, escolares, atividades e muito mais.
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-muted-foreground" />
              Documentos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base">
              Armazene documentos importantes como boletins escolares, 
              receitas médicas, autorizações e outros documentos relevantes.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Perfis das Crianças
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base">
              Gerencie informações importantes sobre cada criança, como alergias,
              medicamentos, contatos de emergência, horários de atividades e preferências.
              Use o seletor de criança no painel principal para alternar entre diferentes perfis.
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
