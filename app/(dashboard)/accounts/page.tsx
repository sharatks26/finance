'use client'
import { AccountCard } from '@/components/accounts/account-card'
import { AccountForm } from '@/components/forms/account-form'
import { ConfirmationModal } from '@/components/ui/confirmation-modal'
import { useAccount } from '@/hooks/use-accounts'
import { STRINGS } from '@/lib/constants/strings'
import type { Account } from '@/lib/validators/account'
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
      <div className="mb-6">
        <h1 className="text-xl font-semibold mb-4">{STRINGS.PAGES.ACCOUNTS.TITLE}</h1>
        <AccountForm />
      </div>

      {isLoading ? (
        <div className="text-center">Loading accounts...</div>
      ) : error ? (
        <div className="text-center text-red-500">Error loading accounts: {error.message}</div>
      ) : (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {accounts.map((account: Account, index: number) => (
            <AccountCard
              key={account.id}
              account={account}
              index={index}
              onDeleteClick={handleDeleteClick}
              isDeletingAccount={isDeletingAccount}
              selectedAccountId={selectedAccount?.id}
            />
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
