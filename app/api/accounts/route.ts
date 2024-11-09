import { createAccount, getAccounts, updateAccount } from '@/lib/accounts'
import { ACCOUNT_TYPE_SORT_ORDER } from '@/lib/constants/accounts'
import { AccountFormValues } from '@/lib/validators/account'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const data = (await req.json()) as AccountFormValues
    const account = await createAccount(data)
    return NextResponse.json(account)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create account' + error }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const data = (await req.json()) as AccountFormValues & { id: string }
    const account = await updateAccount(data)
    return NextResponse.json(account)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update account' + error }, { status: 500 })
  }
}

export async function GET() {
  try {
    const accounts = await getAccounts()

    // If you need custom sort order different from DB enum
    accounts.sort((a, b) => {
      const orderA = ACCOUNT_TYPE_SORT_ORDER[a.type as keyof typeof ACCOUNT_TYPE_SORT_ORDER]
      const orderB = ACCOUNT_TYPE_SORT_ORDER[b.type as keyof typeof ACCOUNT_TYPE_SORT_ORDER]
      return orderA - orderB
    })

    return NextResponse.json(accounts)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to get accounts' + error }, { status: 500 })
  }
}
