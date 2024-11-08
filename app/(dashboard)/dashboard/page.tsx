import { AccountSummary } from '@/components/dashboard/account-summary'
import { CreditCardSummary } from '@/components/dashboard/credit-card-summary'
import { LoanSummary } from '@/components/dashboard/loan-summary'
import { RecentTransactions } from '@/components/dashboard/recent-transactions'
import { UpcomingPayments } from '@/components/dashboard/upcoming-payments'
import { Card } from '@/components/ui/card'

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Overview Section */}
      <section className="grid gap-6 md:grid-cols-3">
        <Card className="p-4">
          <AccountSummary />
        </Card>
        <Card className="p-4">
          <CreditCardSummary />
        </Card>
        <Card className="p-4">
          <LoanSummary />
        </Card>
      </section>

      {/* Transactions and Payments Section */}
      <section className="grid gap-6 md:grid-cols-2">
        <Card className="p-4">
          <RecentTransactions />
        </Card>
        <Card className="p-4">
          <UpcomingPayments />
        </Card>
      </section>
    </div>
  )
}
