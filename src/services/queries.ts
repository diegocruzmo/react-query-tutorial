import { useQueries, useQuery } from '@tanstack/react-query'
import { getTodosIds, getTodos, getTodo } from './api'

export const useTodosIds = () => {
  return useQuery({
    queryKey: ['todosIds'],
    queryFn: getTodosIds
  })
}

export const useTodos = () => {
  return useQuery({
    queryKey: ['todos'],
    queryFn: getTodos
  })
}

export const useTodosList = (ids: (number | undefined)[] | undefined) => {
  const validIds = Array.isArray(ids) ? ids : []
  return useQueries({
    queries: validIds.map((id) => {
      return {
        queryKey: ['todosList', id],
        queryFn: () => getTodo(id!)
      }
    })
  })
}
