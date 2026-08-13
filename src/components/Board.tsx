import { useEffect, useState } from "react"
import List from "./List"
import { fetchLists, type List as ListType } from "../api/tasks"

function Board() {
  const [lists, setLists] = useState<ListType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchListsData = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const data = await fetchLists()
        setLists(data)
      } catch (err) {
        console.error("Error fetching lists", err)
        setError(err instanceof Error ? err.message : "An unexpected error occurred")
      } finally {
        setIsLoading(false)
      }
    }
    fetchListsData()
  }, [])

  function handleAddTask(listId: number) {
    const newTask = {
      id: crypto.randomUUID(),
      title: "New Task",
      description: "Add a description",
    }
    setLists((prevLists) =>
      prevLists.map((list) => (list.id === listId ? { ...list, tasks: [...list.tasks, newTask] } : list)),
    )
  }

  function handleDeleteTask(listId: number, taskId: string) {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId ? { ...list, tasks: list.tasks.filter((task) => task.id !== taskId) } : list,
      ),
    )
  }

  function handleEditTask(
    listId: number,
    taskId: string,
    { title, description }: { title: string; description: string },
  ) {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? { ...list, tasks: list.tasks.map((task) => (task.id === taskId ? { ...task, title, description } : task)) }
          : list,
      ),
    )
  }

  if (isLoading) {
    return <p>Loading Board...</p>
  }

  if (error) {
    return <p>Something went wrong: {error}</p>
  }

  return (
    <div className="board">
      {lists.map((list) => (
        <List
          key={list.id}
          name={list.name}
          tasks={list.tasks}
          onAddTask={() => handleAddTask(list.id)}
          onDeleteTask={(taskId) => handleDeleteTask(list.id, taskId)}
          onEditTask={(taskId, { title, description }: { title: string; description: string }) =>
            handleEditTask(list.id, taskId, { title, description })
          }
        />
      ))}
    </div>
  )
}

export default Board
