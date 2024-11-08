'use client'

import { cn } from '@/lib/utils'
import { BarChart3, CreditCard, LayoutDashboard, PiggyBank, Wallet } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  {
    title: 'Overview',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Accounts',
    href: '/accounts',
    icon: Wallet,
  },
  {
    title: 'Credit Cards',
    href: '/credit-cards',
    icon: CreditCard,
  },
  {
    title: 'Loans',
    href: '/loans',
    icon: PiggyBank,
  },
  {
    title: 'Analytics',
    href: '/analytics',
    icon: BarChart3,
  },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="w-64 border-r bg-card px-3 py-4">
      <div className="space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
              pathname === item.href
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.title}
          </Link>
        ))}
      </div>
    </nav>
  )
}
