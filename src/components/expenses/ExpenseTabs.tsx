
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExpenseList } from "@/components/expenses/ExpenseList";
import { ExpenseSummarySidebar } from "@/components/expenses/ExpenseSummarySidebar";

interface ExpenseTabsProps {
  expenses: any[];
  children: { id: string; name: string }[];
  parents: { id: string; name: string }[];
  categories: { name: string; total: number; percentage: number; color: string }[];
  expenseSummary: any;
}

export function ExpenseTabs({ expenses, children, parents, categories, expenseSummary }: ExpenseTabsProps) {
  const [activeTab, setActiveTab] = useState("all");
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
      <TabsList>
        <TabsTrigger value="all">Todas</TabsTrigger>
        <TabsTrigger value="pending">Pendentes</TabsTrigger>
        <TabsTrigger value="approved">Aprovadas</TabsTrigger>
      </TabsList>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <TabsContent value="all" className="m-0">
            <ExpenseList 
              title="Todas as Despesas" 
              description={`Total: R$ ${totalExpenses.toFixed(2)}`}
              expenses={expenses} 
              showActions={false}
            />
          </TabsContent>
          
          <TabsContent value="pending" className="m-0">
            <ExpenseList 
              title="Despesas Pendentes"
              description="Aguardando aprovação" 
              expenses={expenses.filter(expense => expense.status === "pending")}
              showActions={true}
            />
          </TabsContent>
          
          <TabsContent value="approved" className="m-0">
            <ExpenseList 
              title="Despesas Aprovadas"
              description="Despesas já aprovadas por ambos os responsáveis" 
              expenses={expenses.filter(expense => expense.status === "approved")}
              showActions={false}
            />
          </TabsContent>
        </div>
        
        <div className="lg:col-span-1">
          <ExpenseSummarySidebar 
            totalExpenses={totalExpenses} 
            categories={categories} 
            pendingAmount={expenses.filter(expense => expense.status === "pending")
              .reduce((sum, expense) => sum + expense.amount, 0)}
            approvedAmount={expenses.filter(expense => expense.status === "approved")
              .reduce((sum, expense) => sum + expense.amount, 0)}
          />
        </div>
      </div>
    </Tabs>
  );
}
