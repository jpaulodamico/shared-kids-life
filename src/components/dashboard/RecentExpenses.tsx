
import { DollarSign } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

// Sample data
const expenses = [
  {
    id: 1,
    category: "Educação",
    total: 850,
    shared: 425,
    percentage: 50,
    color: "bg-family-500"
  },
  {
    id: 2,
    category: "Saúde",
    total: 320,
    shared: 160,
    percentage: 50,
    color: "bg-destructive"
  },
  {
    id: 3,
    category: "Atividades Extracurriculares",
    total: 450,
    shared: 225,
    percentage: 50,
    color: "bg-accent-green-500"
  },
  {
    id: 4,
    category: "Alimentação",
    total: 380,
    shared: 190,
    percentage: 50,
    color: "bg-warm-500"
  }
];

export function RecentExpenses() {
  const navigate = useNavigate();
  
  const totalExpenses = expenses.reduce((acc, expense) => acc + expense.total, 0);
  const totalShared = expenses.reduce((acc, expense) => acc + expense.shared, 0);
  
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Despesas Recentes</CardTitle>
          <CardDescription>Este mês: R$ {totalExpenses.toFixed(2)}</CardDescription>
        </div>
        <DollarSign className="w-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {expenses.map((expense) => (
            <div key={expense.id} className="space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">{expense.category}</h3>
                <span className="text-sm font-medium">R$ {expense.total.toFixed(2)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Progress value={expense.percentage} className={expense.color} />
                <span className="text-xs text-muted-foreground">
                  {expense.percentage}% compartilhado
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t flex justify-between items-center">
          <div>
            <p className="text-sm font-medium">Total compartilhado</p>
            <p className="text-xs text-muted-foreground">Sua parte: R$ {totalShared.toFixed(2)}</p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate("/expenses")}
          >
            Ver detalhes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
