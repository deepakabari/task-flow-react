import { useSelector } from "react-redux"
import type { RootState } from "../store/store"
import { Link } from "react-router-dom"

function Dashboard() {
  const boards = useSelector((state: RootState) => state.tasks)

  return (
    <>
      <h1>Dashboard</h1>
      <p>Welcome to your TaskFlow dashboard.</p>

      <ul>
        {boards.map((board) => (
          <li key={board.id}>
            <Link to={`/boards/${board.id}`}>{board.name}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Dashboard
