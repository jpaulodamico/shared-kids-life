
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { DollarSign, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NewExpenseForm } from "@/components/expenses/NewExpenseForm";
import { useToast } from "@/hooks/use-toast";
import { ExpenseSummary } from "@/components/expenses/ExpenseSummary";
import { calculateExpenseSummary } from "@/utils/expenseUtils";

// Sample data
const expenses = [
  {
    id: 1,
    category: "Educação",
    description: "Mensalidade escola",
    date: "02/05/2025",
    amount: 850,
    paidBy: "Lúcia Moreira",
    splitPercentage: 50,
    status: "approved",
    childId: "1"
  },
  {
    id: 2,
    category: "Saúde",
    description: "Consulta Pediatra",
    date: "05/05/2025",
    amount: 320,
    paidBy: "Você",
    splitPercentage: 50,
    status: "pending",
    childId: "1"
  },
  {
    id: 3,
    category: "Atividades",
    description: "Aulas de natação",
    date: "10/05/2025",
    amount: 450,
    paidBy: "Lúcia Moreira",
    splitPercentage: 50,
    status: "approved",
    childId: "2"
  },
  {
    id: 4,
    category: "Alimentação",
    description: "Compras do mês",
    date: "12/05/2025",
    amount: 380,
    paidBy: "Você",
    splitPercentage: 50,
    status: "approved",
    childId: "all"
  }
];

// Categories summary
const categories = [
  { 
    name: "Educação", 
    total: 850, 
    percentage: 42.5,
    color: "bg-family-500" 
  },
  { 
    name: "Saúde", 
    total: 320, 
    percentage: 16,
    color: "bg-destructive" 
  },
  { 
    name: "Atividades", 
    total: 450, 
    percentage: 22.5,
    color: "bg-accent-green-500" 
  },
  { 
    name: "Alimentação", 
    total: 380, 
    percentage: 19,
    color: "bg-warm-500" 
  }
];

// Sample children and parents data
const children = [
  { id: "1", name: "Sofia Santos" },
  { id: "2", name: "Lucas Santos" }
];

const parents = [
  { id: "1", name: "Você" },
  { id: "2", name: "Lúcia Moreira" }
];

const ExpensesPage = () => {
  const { toast } = useToast();
  const [isNewExpenseOpen, setIsNewExpenseOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  // Calculate expense summaries
  const expenseSummary = calculateExpenseSummary(expenses, children, parents);
  
  const handleNewExpense = (data: any) => {
    // Em uma aplicação real, isso seria enviado para o backend
    // e o estado seria atualizado após sucesso
    toast({
      title: "Despesa adicionada",
      description: "A nova despesa foi registrada com sucesso."
    });
    
    console.log("Dados da nova despesa:", data);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Despesas</h1>
          <p className="text-muted-foreground">
            Gerencie e compartilhe as despesas relacionadas às crianças
          </p>
        </div>
        <Button 
          className="gap-1"
          onClick={() => setIsNewExpenseOpen(true)}
        >
          <PlusCircle className="h-4 w-4" />
          Nova Despesa
        </Button>
        
        <NewExpenseForm 
          open={isNewExpenseOpen}
          onOpenChange={setIsNewExpenseOpen}
          onSubmit={handleNewExpense}
        />
      </div>

      {/* Expense Summary Section */}
      <ExpenseSummary 
        summary={expenseSummary} 
        children={children} 
        parents={parents} 
      />

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="pending">Pendentes</TabsTrigger>
          <TabsTrigger value="approved">Aprovadas</TabsTrigger>
        </TabsList>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2">
            <TabsContent value="all" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Todas as Despesas</CardTitle>
                  <CardDescription>
                    Total: R$ {totalExpenses.toFixed(2)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {expenses.map((expense) => (
                      <div key={expense.id} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium">{expense.description}</h3>
                            <p className="text-sm text-muted-foreground">{expense.category}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">R$ {expense.amount.toFixed(2)}</p>
                            <p className="text-sm text-muted-foreground">{expense.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span>Pago por: {expense.paidBy}</span>
                          <span className="text-muted-foreground">•</span>
                          <span>Dividido: {expense.splitPercentage}%</span>
                          <span className="text-muted-foreground">•</span>
                          <span className={expense.status === "approved" ? "text-accent-green-600" : "text-warm-600"}>
                            {expense.status === "approved" ? "Aprovado" : "Pendente"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="pending" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Despesas Pendentes</CardTitle>
                  <CardDescription>
                    Aguardando aprovação
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {expenses
                      .filter(expense => expense.status === "pending")
                      .map((expense) => (
                        <div key={expense.id} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-medium">{expense.description}</h3>
                              <p className="text-sm text-muted-foreground">{expense.category}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">R$ {expense.amount.toFixed(2)}</p>
                              <p className="text-sm text-muted-foreground">{expense.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span>Pago por: {expense.paidBy}</span>
                            <span className="text-muted-foreground">•</span>
                            <span>Dividido: {expense.splitPercentage}%</span>
                          </div>
                          <div className="mt-4 flex gap-2">
                            <Button size="sm" variant="outline" className="w-full">Rejeitar</Button>
                            <Button size="sm" className="w-full">Aprovar</Button>
                          </div>
                        </div>
                    ))}
                    {expenses.filter(expense => expense.status === "pending").length === 0 && (
                      <div className="text-center py-6 text-muted-foreground">
                        Não há despesas pendentes
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="approved" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Despesas Aprovadas</CardTitle>
                  <CardDescription>
                    Despesas já aprovadas por ambos os responsáveis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {expenses
                      .filter(expense => expense.status === "approved")
                      .map((expense) => (
                        <div key={expense.id} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-medium">{expense.description}</h3>
                              <p className="text-sm text-muted-foreground">{expense.category}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">R$ {expense.amount.toFixed(2)}</p>
                              <p className="text-sm text-muted-foreground">{expense.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span>Pago por: {expense.paidBy}</span>
                            <span className="text-muted-foreground">•</span>
                            <span>Dividido: {expense.splitPercentage}%</span>
                            <span className="text-muted-foreground">•</span>
                            <span className="text-accent-green-600">Aprovado</span>
                          </div>
                        </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
          
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Resumo</span>
                  <DollarSign className="w-5 h-5" />
                </CardTitle>
                <CardDescription>
                  Maio 2025
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Total de Despesas</h3>
                    <div className="text-3xl font-bold">
                      R$ {totalExpenses.toFixed(2)}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Sua parte: R$ {(totalExpenses / 2).toFixed(2)}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Categorias</h3>
                    <div className="space-y-3">
                      {categories.map((category) => (
                        <div key={category.name}>
                          <div className="flex justify-between text-sm mb-1">
                            <span>{category.name}</span>
                            <span>R$ {category.total.toFixed(2)}</span>
                          </div>
                          <Progress value={category.percentage} className={category.color} />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Status de Pagamento</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-3 border rounded-lg text-center">
                        <p className="text-sm text-muted-foreground">Pago</p>
                        <p className="text-xl font-medium">R$ 1.680,00</p>
                      </div>
                      <div className="p-3 border rounded-lg text-center">
                        <p className="text-sm text-muted-foreground">Pendente</p>
                        <p className="text-xl font-medium">R$ 320,00</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default ExpensesPage;
