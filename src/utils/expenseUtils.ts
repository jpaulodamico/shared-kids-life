
// Utility functions for expense calculations

export interface Parent {
  id: string;
  name: string;
}

export interface ExpenseSummary {
  totalExpenses: number;
  byChild: {
    [childId: string]: number;
  };
  byParent: {
    [parentId: string]: number;
  };
  balanceDue: {
    parentId: string;
    amount: number;
    direction: 'receive' | 'pay';
  };
}

/**
 * Calculates expense summaries including totals by child and parent
 * and determines the balance due between parents
 */
export function calculateExpenseSummary(
  expenses: any[],
  children: { id: string; name: string }[],
  parents: Parent[]
): ExpenseSummary {
  // Calculate total expenses
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  // Calculate expenses by child
  const byChild: { [childId: string]: number } = {};
  children.forEach(child => {
    const childExpenses = expenses.filter(expense => 
      expense.childId === child.id || expense.childId === "all"
    );
    byChild[child.id] = childExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  });
  
  // Calculate expenses by parent
  const byParent: { [parentId: string]: number } = {};
  parents.forEach(parent => {
    const parentName = parent.name;
    const parentExpenses = expenses.filter(expense => 
      expense.paidBy === parentName
    );
    byParent[parent.id] = parentExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  });
  
  // Calculate balance due between parents
  // Assuming expenses are split 50/50
  const totalPaid = Object.values(byParent).reduce((sum, amount) => sum + amount, 0);
  const fairShare = totalExpenses / parents.length;
  
  // Find parent who paid more
  const sortedParents = [...parents].sort(
    (a, b) => (byParent[b.id] || 0) - (byParent[a.id] || 0)
  );
  
  const payingParent = sortedParents[1];
  const receivingParent = sortedParents[0];
  const payingAmount = fairShare - (byParent[payingParent.id] || 0);
  
  const balanceDue = {
    parentId: payingParent.id,
    amount: Math.abs(payingAmount),
    direction: payingAmount > 0 ? 'pay' : 'receive'
  };

  return {
    totalExpenses,
    byChild,
    byParent,
    balanceDue
  };
}
