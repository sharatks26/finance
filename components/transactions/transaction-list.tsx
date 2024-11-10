import { Card } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn, formatCurrency } from '@/lib/utils'
import { format } from 'date-fns'

export function TransactionList() {
  // This will be replaced with real data from a hook later
  const transactions = [
    {
      id: '1',
      date: new Date(),
      description: 'Grocery Shopping',
      amount: -50.0,
      type: 'DEBIT',
      category: 'Groceries',
      accountName: 'HDFC Savings',
    },
    {
      id: '2',
      date: new Date(),
      description: 'Grocery Shopping',
      amount: -500.0,
      type: 'DEBIT',
      category: 'Groceries',
      accountName: 'HDFC Savings',
    },
    {
      id: '3',
      date: new Date(),
      description: 'Salary',
      amount: 10000.0,
      type: 'CREDIT',
      category: 'Salary',
      accountName: 'ICICI Salary',
    },
  ]

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Account</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{format(transaction.date, 'MMM dd, yyyy')}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>{transaction.category}</TableCell>
              <TableCell>{transaction.accountName}</TableCell>
              <TableCell
                className={cn(
                  'text-right',
                  transaction.amount < 0 ? 'text-red-500' : 'text-green-500'
                )}
              >
                {formatCurrency(transaction.amount)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
