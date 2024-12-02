import { useTodos } from '../services/queries'

const Todos = () => {
  const todosQuery = useTodos()

  if (todosQuery.isLoading) return <div>Loading...</div>
  if (todosQuery.isError) return <div>There was an error!</div>

  return (
    <>
      <ul>
        {todosQuery.data?.map((todo) => (
          <li key={todo.id}>
            <p>
              {todo.title} - {todo.description}
            </p>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Todos
