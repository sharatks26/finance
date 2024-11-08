import { CalendarClock } from 'lucide-react'

export function UpcomingPayments() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Upcoming Payments</h3>

      <div className="space-y-4">
        {upcomingPayments.map((payment) => (
          <div key={payment.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CalendarClock className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="font-medium">{payment.description}</p>
                <p className="text-sm text-muted-foreground">Due: {payment.dueDate}</p>
              </div>
            </div>
            <p className="font-medium">₹{payment.amount}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

const upcomingPayments = [
  {
    id: 1,
    description: 'ICICI Credit Card Bill',
    amount: '25,000',
    dueDate: '15th Mar 2024',
  },
  {
    id: 2,
    description: 'Personal Loan EMI',
    amount: '8,500',
    dueDate: '18th Mar 2024',
  },
  {
    id: 3,
    description: 'Car Loan EMI',
    amount: '12,500',
    dueDate: '20th Mar 2024',
  },
]
