'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { STRINGS } from '@/lib/constants/strings'
import { cn } from '@/lib/utils'
import type { Account } from '@/lib/validators/account'
import { motion } from 'framer-motion'
import { Trash2 } from 'lucide-react'

interface AccountCardProps {
  account: Account
  index: number
  onDeleteClick: (account: Account) => void
  isDeletingAccount: boolean
  selectedAccountId?: string | null
}

const ACCOUNT_TYPE_COLORS = {
  SAVINGS: 'bg-blue-500',
  CURRENT: 'bg-emerald-500',
  CREDIT: 'bg-purple-500',
  LOAN: 'bg-orange-500',
} as const

export function AccountCard({
  account,
  index,
  onDeleteClick,
  isDeletingAccount,
  selectedAccountId,
}: AccountCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card className="p-3 hover:shadow-md transition-shadow duration-200 relative overflow-hidden">
        <div
          className={cn(
            'absolute top-0 left-0 w-1.5 h-full',
            ACCOUNT_TYPE_COLORS[account.type as keyof typeof ACCOUNT_TYPE_COLORS] || 'bg-gray-500'
          )}
        />
        <div className="pl-3">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h2 className="text-sm font-medium">{account.bankName}</h2>
              <p className="text-xs text-muted-foreground">
                {account.type.charAt(0) + account.type.slice(1).toLowerCase()}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Account: ••••{account.accountNumber.slice(-4)}
              </p>
            </div>
            <div className="flex gap-1.5">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  'h-7 w-7 text-muted-foreground',
                  'hover:text-destructive transition-colors duration-200'
                )}
                onClick={() => onDeleteClick(account)}
                disabled={isDeletingAccount && selectedAccountId === account.id}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Balance</span>
              <p className="text-lg font-semibold">₹{account.balance.toLocaleString()}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs h-8 hover:bg-primary/5 transition-colors duration-200"
            >
              {STRINGS.ACTIONS.VIEW} Details →
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
