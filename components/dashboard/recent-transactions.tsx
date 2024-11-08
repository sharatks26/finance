import { ArrowDownRight, ArrowUpRight } from 'lucide-react'

export function RecentTransactions() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Recent Transactions</h3>

      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {transaction.type === 'credit' ? (
                <ArrowUpRight className="h-4 w-4 text-green-500" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-red-500" />
              )}
              <div>
                <p className="font-medium">{transaction.description}</p>
                <p className="text-sm text-muted-foreground">{transaction.date}</p>
              </div>
            </div>
            <p
              className={`font-medium ${
                transaction.type === 'credit' ? 'text-green-500' : 'text-red-500'
              }`}
            >
              ₹{transaction.amount}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

const transactions = [
  {
    id: 1,
    type: 'credit',
    description: 'Salary Credit',
    amount: '75,000',
    date: 'Today',
  },
  {
    id: 2,
    type: 'debit',
    description: 'HDFC Credit Card Bill',
    amount: '45,000',
    date: 'Yesterday',
  },
  {
    id: 3,
    type: 'debit',
    description: 'Car Loan EMI',
    amount: '12,500',
    date: '2 days ago',
  },
]
