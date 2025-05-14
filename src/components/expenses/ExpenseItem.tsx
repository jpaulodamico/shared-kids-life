
import { Button } from "@/components/ui/button";

interface ExpenseItemProps {
  expense: {
    id: number;
    category: string;
    description: string;
    date: string;
    amount: number;
    paidBy: string;
    splitPercentage: number;
    status: string;
  };
  showActions?: boolean;
}

export function ExpenseItem({ expense, showActions = false }: ExpenseItemProps) {
  return (
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
        {expense.status && (
          <>
            <span className="text-muted-foreground">•</span>
            <span className={expense.status === "approved" ? "text-accent-green-600" : "text-warm-600"}>
              {expense.status === "approved" ? "Aprovado" : "Pendente"}
            </span>
          </>
        )}
      </div>
      {showActions && (
        <div className="mt-4 flex gap-2">
          <Button size="sm" variant="outline" className="w-full">Rejeitar</Button>
          <Button size="sm" className="w-full">Aprovar</Button>
        </div>
      )}
    </div>
  );
}
