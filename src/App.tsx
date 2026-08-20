import "./App.css"
import { useTheme } from "./context/ThemeContext"
import { Link, Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Profile from "./pages/Profile"
import BoardPage from "./pages/BoardPage"
import { fetchBoards } from "./api/tasks"
import useFetch from "./hooks/useFetch"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setBoards } from "./store/tasksSlice"

function App() {
  const { data, isLoading, error } = useFetch(fetchBoards)
  const { theme, toggleTheme } = useTheme()
  const dispatch = useDispatch()

  useEffect(() => {
    if (data) {
      dispatch(setBoards(data))
    }
  }, [data, dispatch])

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
