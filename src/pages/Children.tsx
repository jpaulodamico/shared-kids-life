
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Heart, 
  GraduationCap, 
  Calendar, 
  ClipboardList,
  User,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Sample data for children
const children = [
  {
    id: 1,
    name: "Sofia Santos",
    age: 7,
    birthday: "15/06/2018",
    school: "Escola Miraflores",
    grade: "2º ano",
    teacher: "Profa. Maria Oliveira",
    bloodType: "A+",
    allergies: ["Amendoim", "Poeira"],
    medications: ["Nenhuma"],
    height: "1,25m",
    weight: "26kg",
    lastCheckup: "10/03/2025",
    activities: ["Natação", "Ballet", "Inglês"],
    imageUrl: "",
    initials: "SS"
  },
  {
    id: 2,
    name: "Lucas Santos",
    age: 5,
    birthday: "22/09/2020",
    school: "Jardim Infantil Arco-Íris",
    grade: "Pré-escolar",
    teacher: "Profa. Carla Mendes",
    bloodType: "O+",
    allergies: ["Nenhuma"],
    medications: ["Vitamina D (diária)"],
    height: "1,10m",
    weight: "20kg",
    lastCheckup: "15/04/2025",
    activities: ["Futebol", "Música"],
    imageUrl: "",
    initials: "LS"
  }
];

// Sample schedule for Sofia
const sofiaSchedule = [
  { day: "Segunda", activities: ["Escola (07:30 - 12:30)", "Almoço", "Natação (15:00 - 16:00)"] },
  { day: "Terça", activities: ["Escola (07:30 - 12:30)", "Almoço", "Ballet (15:00 - 16:00)"] },
  { day: "Quarta", activities: ["Escola (07:30 - 12:30)", "Almoço", "Inglês (15:00 - 16:00)"] },
  { day: "Quinta", activities: ["Escola (07:30 - 12:30)", "Almoço", "Natação (15:00 - 16:00)"] },
  { day: "Sexta", activities: ["Escola (07:30 - 12:30)", "Almoço", "Livre"] },
  { day: "Sábado", activities: ["Livre", "Visita avós (quinzenal)"] },
  { day: "Domingo", activities: ["Livre"] }
];

// Sample schedule for Lucas
const lucasSchedule = [
  { day: "Segunda", activities: ["Escola (08:00 - 12:00)", "Almoço", "Descanso"] },
  { day: "Terça", activities: ["Escola (08:00 - 12:00)", "Almoço", "Futebol (16:00 - 17:00)"] },
  { day: "Quarta", activities: ["Escola (08:00 - 12:00)", "Almoço", "Descanso"] },
  { day: "Quinta", activities: ["Escola (08:00 - 12:00)", "Almoço", "Música (16:00 - 17:00)"] },
  { day: "Sexta", activities: ["Escola (08:00 - 12:00)", "Almoço", "Livre"] },
  { day: "Sábado", activities: ["Livre", "Visita avós (quinzenal)"] },
  { day: "Domingo", activities: ["Livre"] }
];

const ChildrenPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Crianças</h1>
          <p className="text-muted-foreground">
            Gerenciamento de informações importantes sobre as crianças
          </p>
        </div>
        <Button className="gap-1">
          <Plus className="h-4 w-4" />
          Adicionar Criança
        </Button>
      </div>

      <Tabs defaultValue="sofia">
        <TabsList className="mb-6">
          {children.map((child) => (
            <TabsTrigger key={child.id} value={child.name.toLowerCase().split(' ')[0]}>
              {child.name}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {children.map((child) => {
          const isFirst = child.id === 1;
          const schedule = isFirst ? sofiaSchedule : lucasSchedule;
          
          return (
            <TabsContent key={child.id} value={child.name.toLowerCase().split(' ')[0]} className="m-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-1">
                  <CardHeader className="text-center pb-2">
                    <Avatar className="w-24 h-24 mx-auto mb-2">
                      <AvatarFallback className="bg-family-100 text-family-700 text-3xl">
                        {child.initials}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-xl">{child.name}</CardTitle>
                    <p className="text-muted-foreground">{child.age} anos</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h3 className="font-medium flex items-center gap-1">
                          <User className="h-4 w-4" />
                          Informações Básicas
                        </h3>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="text-muted-foreground">Data Nasc.:</div>
                          <div>{child.birthday}</div>
                          <div className="text-muted-foreground">Idade:</div>
                          <div>{child.age} anos</div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-medium flex items-center gap-1">
                          <GraduationCap className="h-4 w-4" />
                          Educação
                        </h3>
                        <div className="space-y-1 text-sm">
                          <div>
                            <span className="text-muted-foreground">Escola: </span>
                            {child.school}
                          </div>
                          <div>
                            <span className="text-muted-foreground">Série: </span>
                            {child.grade}
                          </div>
                          <div>
                            <span className="text-muted-foreground">Professor(a): </span>
                            {child.teacher}
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-medium flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          Saúde
                        </h3>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="text-muted-foreground">Tipo Sanguíneo:</div>
                          <div>{child.bloodType}</div>
                          <div className="text-muted-foreground">Altura:</div>
                          <div>{child.height}</div>
                          <div className="text-muted-foreground">Peso:</div>
                          <div>{child.weight}</div>
                          <div className="text-muted-foreground">Última Consulta:</div>
                          <div>{child.lastCheckup}</div>
                        </div>
                        
                        <div className="text-sm mt-2">
                          <div className="text-muted-foreground mb-1">Alergias:</div>
                          <div className="flex flex-wrap gap-1">
                            {child.allergies.map((allergy, index) => (
                              <span 
                                key={index}
                                className="px-2 py-0.5 bg-destructive/10 text-destructive rounded-full text-xs"
                              >
                                {allergy}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="text-sm mt-2">
                          <div className="text-muted-foreground mb-1">Medicamentos:</div>
                          <div className="flex flex-wrap gap-1">
                            {child.medications.map((medication, index) => (
                              <span 
                                key={index}
                                className="px-2 py-0.5 bg-family-100 text-family-700 rounded-full text-xs"
                              >
                                {medication}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="md:col-span-2 space-y-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Horário Semanal
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="border rounded-lg divide-y">
                        {schedule.map((day, index) => (
                          <div key={index} className="flex p-3">
                            <div className="font-medium w-24">{day.day}</div>
                            <div className="flex-1">
                              <ul className="list-disc list-inside space-y-1">
                                {day.activities.map((activity, actIndex) => (
                                  <li key={actIndex} className="text-sm">{activity}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2">
                        <ClipboardList className="h-5 w-5" />
                        Atividades Extracurriculares
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {child.activities.map((activity, index) => (
                          <Card key={index} className="border-none shadow-none bg-muted/50">
                            <CardContent className="p-4">
                              <h3 className="font-medium">{activity}</h3>
                              <p className="text-sm text-muted-foreground">
                                {activity === "Natação" 
                                  ? "Segunda e Quinta, 15:00 - 16:00" 
                                  : activity === "Ballet" 
                                  ? "Terça, 15:00 - 16:00"
                                  : activity === "Inglês" 
                                  ? "Quarta, 15:00 - 16:00"
                                  : activity === "Futebol"
                                  ? "Terça, 16:00 - 17:00"
                                  : "Quinta, 16:00 - 17:00"
                                }
                              </p>
                              <p className="text-xs mt-1">
                                {activity === "Natação" 
                                  ? "Academia Central - Prof. Ricardo" 
                                  : activity === "Ballet" 
                                  ? "Estúdio de Dança Lua - Profa. Beatriz"
                                  : activity === "Inglês" 
                                  ? "Centro Cultural - Profa. Amanda"
                                  : activity === "Futebol"
                                  ? "Clube Esportivo - Prof. Carlos"
                                  : "Centro Cultural - Prof. João"
                                }
                              </p>
                            </CardContent>
                          </Card>
                        ))}
                        
                        <Card className="border-dashed shadow-none bg-transparent flex items-center justify-center">
                          <CardContent className="p-4 text-center cursor-pointer">
                            <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center mx-auto mb-2">
                              <Plus className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <p className="text-sm text-muted-foreground">Adicionar Atividade</p>
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};

export default ChildrenPage;
