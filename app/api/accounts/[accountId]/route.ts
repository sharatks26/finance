import { deleteAccount } from '@/lib/accounts'
import { NextResponse } from 'next/server'

export async function DELETE(request: Request, { params }: { params: { accountId: string } }) {
  try {
    const { accountId } = await params
    const deletedAccount = await deleteAccount(accountId)
    return NextResponse.json(deletedAccount)
  } catch (error) {
    console.error('Failed to delete account:', error)
    return NextResponse.json({ error: 'Failed to delete account' }, { status: 500 })
  }
}
