
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExpenseItem } from "@/components/expenses/ExpenseItem";

interface ExpenseListProps {
  title: string;
  description: string;
  expenses: any[];
  showActions?: boolean;
}

export function ExpenseList({ title, description, expenses, showActions = false }: ExpenseListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {expenses.map((expense) => (
            <ExpenseItem 
              key={expense.id} 
              expense={expense} 
              showActions={showActions} 
            />
          ))}
          {expenses.length === 0 && (
            <div className="text-center py-6 text-muted-foreground">
              Não há despesas {title.toLowerCase().includes("pendente") ? "pendentes" : ""}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
