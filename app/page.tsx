import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { authOptions } from './api/auth/[...nextauth]/route'

export default async function LandingPage() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/dashboard')
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section
        className="flex-1 flex flex-col items-center justify-center px-6 py-16 
          bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
      >
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Personal Finance Tracker
          </h1>
          <p className="text-xl text-muted-foreground">
            A personal dashboard to manage my bank accounts, credit cards, and loan EMIs
          </p>
          <div className="flex justify-center">
            <Button asChild size="lg">
              <Link href="/login">
                Sign In
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Overview */}
      <section className="py-12 px-6 bg-muted/50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Quick Overview</h2>
          <div className="space-y-4">
            <div
              className="flex items-center justify-between p-4 
              bg-card rounded-lg border"
            >
              <span className="font-medium">Bank Accounts</span>
              <span>HDFC, ICICI</span>
            </div>
            <div
              className="flex items-center justify-between p-4 
              bg-card rounded-lg border"
            >
              <span className="font-medium">Credit Cards</span>
              <span>HDFC, ICICI, SBI, INDUSIND</span>
            </div>
            <div
              className="flex items-center justify-between p-4 
              bg-card rounded-lg border"
            >
              <span className="font-medium">Active Loans</span>
              <span>Car Loan, Personal Loan</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-6 border-t">
        <div className="max-w-2xl mx-auto text-center text-sm text-muted-foreground">
          Personal Finance Management Dashboard
        </div>
      </footer>
    </div>
  )
}
