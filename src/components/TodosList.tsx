import { useForm, SubmitHandler } from 'react-hook-form'
import {
  useCreateTodo,
  useDeleteTodo,
  useUpdateTodo
} from '../services/mutations'
import { useTodosList, useTodosIds } from '../services/queries'
import { Todo } from '../types/types'

const TodosList = () => {
  const todosIdsQuery = useTodosIds()
  const todosQueries = useTodosList(todosIdsQuery.data)

  const createTodoMutation = useCreateTodo()
  const updateTodoMutation = useUpdateTodo()
  const deleteTodoMutation = useDeleteTodo()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Todo>()

  const onSubmit: SubmitHandler<Todo> = (data) => {
    createTodoMutation.mutate(data)
  }

  const handleDoneUpdate: SubmitHandler<Todo> = (data) => {
    updateTodoMutation.mutate({ ...data, checked: true })
  }

  const handleDelete = (id: number) => {
    deleteTodoMutation.mutate(id)
  }

  return (
    <>
      <h2>Add Todo</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder='Title...'
          {...register('title', { required: true })}
        />
        {errors.title && <span>This field is required</span>}
        <br />
        <input
          placeholder='Description...'
          {...register('description', { required: true })}
        />
        {errors.description && <span>This field is required</span>}
        <br />
        <input
          type='submit'
          disabled={createTodoMutation.isPending}
          value={createTodoMutation.isPending ? 'Adding Todo...' : 'Add Todo'}
        />
      </form>

      <h2>Todos List</h2>
      <ul>
        {todosQueries.map(({ data }) => {
          return data ? (
            <li key={data.id}>
              <div>
                Id: {data.id} / Status: {data.checked ? 'Completed' : 'Process'}
              </div>
              <div>
                Name: {data.title} / Description: {data.description}
              </div>
              <div>
                <button
                  disabled={data.checked}
                  onClick={() => handleDoneUpdate(data)}
                >
                  Done
                </button>
                {data?.id && (
                  <button onClick={() => handleDelete(data.id!)}>Delete</button>
                )}
              </div>
            </li>
          ) : null
        })}
      </ul>
    </>
  )
}

export default TodosList
