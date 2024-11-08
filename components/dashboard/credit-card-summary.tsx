import { CreditCard } from 'lucide-react'

export function CreditCardSummary() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Credit Cards</h3>
        <CreditCard className="h-5 w-5 text-muted-foreground" />
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">HDFC Credit Card</p>
          <p className="text-2xl font-bold">₹45,000</p>
          <p className="text-sm text-red-500">Due in 5 days</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">ICICI Credit Card</p>
          <p className="text-2xl font-bold">₹25,000</p>
          <p className="text-sm text-red-500">Due in 12 days</p>
        </div>
      </div>
    </div>
  )
}
