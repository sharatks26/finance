import { PrismaAdapter } from '@auth/prisma-adapter'
import { AuthOptions } from 'next-auth'
import { prisma } from './prisma'

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
  },
}
