
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DollarSign } from "lucide-react";

interface ExpenseSummarySidebarProps {
  totalExpenses: number;
  categories: { name: string; total: number; percentage: number; color: string }[];
  pendingAmount: number;
  approvedAmount: number;
}

export function ExpenseSummarySidebar({ 
  totalExpenses, 
  categories, 
  pendingAmount, 
  approvedAmount 
}: ExpenseSummarySidebarProps) {
  return (
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
                <p className="text-xl font-medium">R$ {approvedAmount.toFixed(2)}</p>
              </div>
              <div className="p-3 border rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Pendente</p>
                <p className="text-xl font-medium">R$ {pendingAmount.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
