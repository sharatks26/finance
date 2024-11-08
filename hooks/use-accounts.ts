import { type AccountFormValues } from '@/lib/validators/account'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

export function useAccount() {
  const queryClient = useQueryClient()

  const { data: accounts, isLoading } = useQuery({
    queryKey: ['accounts'],
    queryFn: async () => {
      const response = await axios.get('/api/accounts')
      return response.data
    },
  })

  const createAccount = useMutation({
    mutationFn: async (data: AccountFormValues) => {
      const formattedData = {
        ...data,
        dueDate: data.dueDate?.toISOString(),
        loanStartDate: data.loanStartDate?.toISOString(),
        loanEndDate: data.loanEndDate?.toISOString(),
      }
      const response = await axios.post('/api/accounts', formattedData)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
    },
  })

  const updateAccount = useMutation({
    mutationFn: async (data: AccountFormValues) => {
      const formattedData = {
        ...data,
        dueDate: data.dueDate?.toISOString(),
        loanStartDate: data.loanStartDate?.toISOString(),
        loanEndDate: data.loanEndDate?.toISOString(),
      }
      const response = await axios.patch('/api/accounts', formattedData)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
    },
  })

  return {
    accounts,
    isLoading,
    createAccount: createAccount.mutateAsync,
    updateAccount: updateAccount.mutateAsync,
  }
}
