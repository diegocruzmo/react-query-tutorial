import axios from 'axios'
import { Todo } from '../types/types'

const URL = 'http://localhost:8080'
const axiosInstance = axios.create({ baseURL: URL })

export const getTodosIds = async () => {
  // Return [1, 2, 3, 4...]
  return (await axiosInstance.get<Array<Todo>>('todos')).data.map(
    (todo) => todo.id
  )
}

export const getTodos = async () => {
  return (await axiosInstance.get<Array<Todo>>('todos')).data
}

export const getTodo = async (id: number) => {
  return (await axiosInstance.get<Todo>(`todos/${id}`)).data
}
