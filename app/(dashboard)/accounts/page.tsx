import { AccountForm } from '@/components/forms/account-form'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { getAccounts } from '@/lib/accounts'
import type { Account } from '@/lib/validators/account'

export default async function AccountsPage() {
  const accounts = await getAccounts()

  return (
    <div className="container mx-auto py-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Your Accounts</h1>
        <AccountForm />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {accounts.map((account: Account) => (
          <Card key={account.bankName} className="p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="font-semibold">{account.bankName}</h2>
                <p className="text-sm text-muted-foreground">
                  {account.type.charAt(0) + account.type.slice(1).toLowerCase()}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Account: ••••{account.accountNumber.slice(-4)}
                </p>
              </div>
              <Badge variant={account.type === 'SAVINGS' ? 'secondary' : 'default'}>
                {account.type}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-2xl font-bold">₹{account.balance.toLocaleString()}</p>
              <Button variant="ghost" size="sm">
                View Details
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
