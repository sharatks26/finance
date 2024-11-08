import { DashboardHeader } from '@/components/dashboard/header'
import { DashboardNav } from '@/components/dashboard/nav'
import { getServerSession, Session } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../api/auth/[...nextauth]/route'

// Define a type for the session that includes id
interface ExtendedSession extends Session {
  user: {
    id: string
    email?: string | null
    name?: string | null
    image?: string | null
  }
}

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = (await getServerSession(authOptions)) as ExtendedSession | null

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader user={session.user} />
      <div className="flex flex-1">
        <DashboardNav />
        <main className="flex-1 bg-muted/50">{children}</main>
      </div>
    </div>
  )
}
