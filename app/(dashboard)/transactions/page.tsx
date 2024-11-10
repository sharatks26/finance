import { CreateTransactionDialog } from '@/components/transactions/create-transaction-dialog'
import { TransactionFilters } from '@/components/transactions/transaction-filters'
import { TransactionList } from '@/components/transactions/transaction-list'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Transactions',
  description: 'Manage and view your transactions',
}

export default function TransactionsPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
        <CreateTransactionDialog>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Transaction
          </Button>
        </CreateTransactionDialog>
      </div>

      <TransactionFilters />
      <TransactionList />
    </div>
  )
}
