import { useEffect, useState } from "react"
import List from "./List"
import { fetchLists } from "../api/tasks"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../store/store"
import { setLists } from "../store/tasksSlice"

function Board() {
  // subscribe to whole tasks slice
  const lists = useSelector((state: RootState) => state.tasks)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchListsData = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const data = await fetchLists()
        dispatch(setLists(data))
      } catch (err) {
        console.error("Error fetching lists", err)
        setError(err instanceof Error ? err.message : "An unexpected error occurred")
      } finally {
        setIsLoading(false)
      }
    }
    fetchListsData()
  }, [dispatch])

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
          listId={list.id}
        />
      ))}
    </div>
  )
}

export default Board
