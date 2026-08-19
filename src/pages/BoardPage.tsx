import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import type { RootState } from "../store/store"
import List from "../components/List"

function BoardPage() {
  const { boardId } = useParams()
  const board = useSelector((state: RootState) => state.tasks.find((b) => b.id === boardId))

  return (
    <>
      {board ? (
        <div className="board">
          {board.lists.map((list) => (
            <List key={list.id} name={list.name} tasks={list.tasks} listId={list.id} boardId={board.id} />
          ))}
        </div>
      ) : (
        <p>Board not found</p>
      )}
    </>
  )
}

export default BoardPage
