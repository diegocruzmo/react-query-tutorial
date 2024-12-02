import { useTodosList, useTodosIds } from '../services/queries'

const TodosList = () => {
  const todosIdsQuery = useTodosIds()
  const todosQueries = useTodosList(todosIdsQuery.data)

  return (
    <>
      <h2>Todos</h2>
      <ul>
        {todosQueries.map(({ data }) => {
          console.log(data)
          return data ? (
            <li key={data.id}>
              <div>Id: {data.id}</div>
            </li>
          ) : null
        })}
      </ul>
    </>
  )
}

export default TodosList
