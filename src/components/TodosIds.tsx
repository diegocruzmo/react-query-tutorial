import { useTodosIds } from '../services/queries'

const TodosIds = () => {
  const todosIdsQuery = useTodosIds()

  console.log(todosIdsQuery.fetchStatus)
  console.log(todosIdsQuery.status)

  if (todosIdsQuery.isPending) return <div>Loading...</div>
  if (todosIdsQuery.isError) return <div>There was an error!</div>

  return (
    <div>
      <p>Query function status: {todosIdsQuery.fetchStatus}</p>
      {todosIdsQuery.data?.map((id) => (
        <p key={id}>{id}</p>
      ))}
    </div>
  )
}

export default TodosIds
