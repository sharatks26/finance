import { IndianRupee } from 'lucide-react'

export function AccountSummary() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Bank Accounts</h3>
        <IndianRupee className="h-5 w-5 text-muted-foreground" />
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">HDFC Savings</p>
          <p className="text-2xl font-bold">₹1,25,000</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">ICICI Salary</p>
          <p className="text-2xl font-bold">₹75,000</p>
        </div>
      </div>

      <div className="pt-2">
        <p className="text-sm text-muted-foreground">Total Balance</p>
        <p className="text-2xl font-bold">₹2,00,000</p>
      </div>
    </div>
  )
}
