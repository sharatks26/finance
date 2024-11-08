import { Wallet } from 'lucide-react'

export function LoanSummary() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Active Loans</h3>
        <Wallet className="h-5 w-5 text-muted-foreground" />
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">Car Loan</p>
          <p className="text-2xl font-bold">₹5,00,000</p>
          <p className="text-sm text-muted-foreground">EMI: ₹12,500</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Personal Loan</p>
          <p className="text-2xl font-bold">₹2,00,000</p>
          <p className="text-sm text-muted-foreground">EMI: ₹8,500</p>
        </div>
      </div>
    </div>
  )
}
