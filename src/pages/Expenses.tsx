import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { NewExpenseForm } from "@/components/expenses/NewExpenseForm";
import { useToast } from "@/hooks/use-toast";
import { ExpenseSummary } from "@/components/expenses/ExpenseSummary";
import { calculateExpenseSummary } from "@/utils/expenseUtils";
import { ExpenseTabs } from "@/components/expenses/ExpenseTabs";

// Empty expense data
const expenses = [];

// Empty categories 
const categories = [];

// Sample children and parents data (keeping these as they're used for dropdown options)
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
