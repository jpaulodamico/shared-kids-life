
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet, Receipt, Calculator } from "lucide-react";
import { ExpenseSummary as ExpenseSummaryType } from "@/utils/expenseUtils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ExpenseSummaryProps {
  summary: ExpenseSummaryType;
  children: { id: string; name: string }[];
  parents: { id: string; name: string }[];
}

export function ExpenseSummary({ summary, children, parents }: ExpenseSummaryProps) {
  const { totalExpenses, byChild, byParent, balanceDue } = summary;
  
  // Find parent who should pay
  const payingParent = parents.find(parent => parent.id === balanceDue.parentId);
  const receivingParent = parents.find(parent => parent.id !== balanceDue.parentId);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Payments by Parent */}
      <Card className="lg:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg">Pagamentos por Responsável</CardTitle>
          <Wallet className="w-5 h-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Responsável</TableHead>
                <TableHead className="text-right">Valor Pago</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {parents.map(parent => (
                <TableRow key={parent.id}>
                  <TableCell>{parent.name}</TableCell>
                  <TableCell className="text-right">R$ {(byParent[parent.id] || 0).toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Expenses by Child */}
      <Card className="lg:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg">Gastos por Criança</CardTitle>
          <Receipt className="w-5 h-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Criança</TableHead>
                <TableHead className="text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {children.map(child => (
                <TableRow key={child.id}>
                  <TableCell>{child.name}</TableCell>
                  <TableCell className="text-right">R$ {(byChild[child.id] || 0).toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Balance Calculation */}
      <Card className="lg:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg">Ajuste de Contas</CardTitle>
          <Calculator className="w-5 h-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total de Despesas</p>
              <p className="text-xl font-semibold">R$ {totalExpenses.toFixed(2)}</p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground mb-1">Valor por Responsável (50/50)</p>
              <p className="text-lg">R$ {(totalExpenses / 2).toFixed(2)}</p>
            </div>
            
            <div className="pt-4 border-t">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Saldo:</span>
                <Badge variant={balanceDue.direction === 'pay' ? 'destructive' : 'default'}>
                  R$ {balanceDue.amount.toFixed(2)}
                </Badge>
              </div>
              
              {payingParent && receivingParent && (
                <p className="text-sm">
                  <strong>{payingParent.name}</strong> deve pagar <strong>R$ {balanceDue.amount.toFixed(2)}</strong> para <strong>{receivingParent.name}</strong>
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
