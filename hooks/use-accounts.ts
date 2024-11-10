import { type AccountFormValues } from '@/lib/validators/account'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

export function useAccount() {
  const queryClient = useQueryClient()

  const {
    data: accounts,
    isLoading,
    error,
  } = useQuery({
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

  const deleteAccountMutation = useMutation({
    mutationFn: async (accountId: string) => {
      await axios.delete(`/api/accounts/${accountId}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
    },
  })

  return {
    error,
    accounts: accounts || [],
    isLoading,
    createAccount: createAccount.mutateAsync,
    updateAccount: updateAccount.mutateAsync,
    deleteAccount: deleteAccountMutation.mutate,
    isDeletingAccount: deleteAccountMutation.isPending,
  }
}
