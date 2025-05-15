
import { DollarSign } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

// Empty expenses array - removing test data
const allExpenses = [];

interface RecentExpensesProps {
  selectedChildId?: string;
}

export function RecentExpenses({ selectedChildId = "all" }: RecentExpensesProps) {
  const navigate = useNavigate();
  
  // Filtra as despesas com base na criança selecionada
  const expenses = selectedChildId === "all"
    ? allExpenses
    : allExpenses.filter(expense => expense.childId === selectedChildId || expense.childId === "all");
  
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
        {expenses.length > 0 ? (
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
        ) : (
          <div className="py-8 text-center">
            <DollarSign className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-muted-foreground">Nenhuma despesa registrada.</p>
            <p className="text-sm text-muted-foreground/70">
              Registre despesas relacionadas às crianças para visualizá-las aqui.
            </p>
          </div>
        )}
        <div className="mt-4 pt-4 border-t flex justify-between items-center">
          <div>
            <p className="text-sm font-medium">Total compartilhado</p>
            <p className="text-xs text-muted-foreground">Sua parte: R$ {totalShared.toFixed(2)}</p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate("/app/expenses")}
          >
            Ver detalhes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
