import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Todo } from '../types/types'
import { createTodo, updateTodo, deleteTodo } from './api'

export const useCreateTodo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Todo) => createTodo(data),

    // onMutate: () => console.log('mutate'),
    // onError: () => console.log('error'),
    // onSuccess: () => console.log('success'),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error)
      } else {
        await queryClient.invalidateQueries({ queryKey: ['todosIds'] })
      }
    }
  })
}

export const useUpdateTodo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Todo) => updateTodo(data),

    onSettled: async (_, error, variables) => {
      if (error) {
        console.log(error)
      } else {
        await queryClient.invalidateQueries({ queryKey: ['todosIds'] })
        await queryClient.invalidateQueries({
          queryKey: ['todo', { id: variables.id }]
        })
      }
    }
  })
}

export const useDeleteTodo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deleteTodo(id),

    onSettled: async (_, error) => {
      if (error) {
        console.log(error)
      } else {
        console.log('Deleted successfully!')
        await queryClient.invalidateQueries({ queryKey: ['todosIds'] })
      }
    }
  })
}
