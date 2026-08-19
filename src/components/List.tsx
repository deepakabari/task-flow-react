import Card from "./Card"
import type { Task } from "../api/tasks"
import { useDispatch } from "react-redux"
import { addTask } from "../store/tasksSlice"
import { memo } from "react"

type ListProps = {
  name: string
  tasks: Task[]
  listId: number
  boardId: string
}

function List({ name, tasks, listId, boardId }: ListProps) {
  const dispatch = useDispatch()

  const handleAddTask = () => {
    dispatch(
      addTask({
        boardId,
        listId,
        task: { id: crypto.randomUUID(), title: "New Task", description: "Add a description" },
      }),
    )
  }

  return (
    <div className="list">
      <h3>{name}</h3>
      {tasks.map((task) => (
        <Card
          key={task.id}
          title={task.title}
          description={task.description}
          listId={listId}
          taskId={task.id}
          boardId={boardId}
        />
      ))}
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  )
}

export default memo(List)
