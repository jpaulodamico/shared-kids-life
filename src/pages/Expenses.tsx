
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { NewExpenseForm } from "@/components/expenses/NewExpenseForm";
import { useToast } from "@/hooks/use-toast";
import { ExpenseSummary } from "@/components/expenses/ExpenseSummary";
import { calculateExpenseSummary } from "@/utils/expenseUtils";
import { ExpenseTabs } from "@/components/expenses/ExpenseTabs";

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

      {/* Expense Tabs and Content */}
      <ExpenseTabs 
        expenses={expenses}
        children={children}
        parents={parents}
        categories={categories}
        expenseSummary={expenseSummary}
      />
    </div>
  );
};

export default ExpensesPage;
