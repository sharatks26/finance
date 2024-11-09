'use client'
import { AccountForm } from '@/components/forms/account-form'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ConfirmationModal } from '@/components/ui/confirmation-modal'
import { useAccount } from '@/hooks/use-accounts'
import type { Account } from '@/lib/validators/account'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export default function AccountsPage() {
  const { accounts, isLoading, error, deleteAccount, isDeletingAccount } = useAccount()

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null)

  const handleDeleteClick = (account: Account) => {
    setSelectedAccount(account)
    setShowDeleteModal(true)
  }

  const handleDeleteConfirm = async () => {
    if (!selectedAccount) return

    try {
      await deleteAccount(selectedAccount.id)
      toast.success('Account deleted successfully')
      setShowDeleteModal(false)
      setSelectedAccount(null)
    } catch (error) {
      console.error('Failed to delete account:', error)
      toast.error('Failed to delete account')
    }
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Your Accounts</h1>
        <AccountForm />
      </div>

      {isLoading ? (
        <div className="text-center">Loading accounts...</div>
      ) : error ? (
        <div className="text-center text-red-500">Error loading accounts: {error.message}</div>
      ) : (
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
                <div className="flex gap-2">
                  <Badge variant={account.type === 'SAVINGS' ? 'secondary' : 'default'}>
                    {account.type}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => handleDeleteClick(account)}
                    disabled={isDeletingAccount && selectedAccount?.id === account.id}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
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
      )}

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Account"
        description={`Are you sure you want to delete your 
          ${selectedAccount?.bankName} account? This action cannot be undone.`}
        confirmText={isDeletingAccount ? 'Deleting...' : 'Delete'}
        cancelText="Cancel"
        isLoading={isDeletingAccount}
      />
    </div>
  )
}
