import "./App.css"
import { useTheme } from "./context/ThemeContext"
import { Link, Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Profile from "./pages/Profile"
import BoardPage from "./pages/BoardPage"
import { useEffect, useState } from "react"
import { fetchBoards } from "./api/tasks"
import { useDispatch } from "react-redux"
import { setBoards } from "./store/tasksSlice"

function App() {
  const { theme, toggleTheme } = useTheme()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchBoardsData = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const data = await fetchBoards()
        dispatch(setBoards(data))
      } catch (err) {
        console.error("Error fetching boards", err)
        setError(err instanceof Error ? err.message : "An unexpected error occurred")
      } finally {
        setIsLoading(false)
      }
    }
    fetchBoardsData()
  }, [dispatch])

  return (
    <div className={`app ${theme}`}>
      <h1>TaskFlow</h1>
      <button onClick={toggleTheme}>Toggle Theme {theme}</button>

      <nav>
        <Link to="/">Dashboard</Link>
        <Link to="/profile">Profile</Link>
      </nav>

      {isLoading ? (
        <p>Loading Boards...</p>
      ) : error ? (
        <p>Something went wrong: {error}</p>
      ) : (
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/boards/:boardId" element={<BoardPage />} />
        </Routes>
      )}
    </div>
  )
}

export default App
