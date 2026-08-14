import Board from "./components/Board"
import "./App.css"
import { useTheme } from "./context/ThemeContext"

function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className={`app ${theme}`}>
      <h1>TaskFlow</h1>
      <button onClick={toggleTheme}>Toggle Theme {theme}</button>
      <Board />
    </div>
  )
}

export default App
