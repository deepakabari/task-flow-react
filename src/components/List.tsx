import Card from "./Card"

type Task = {
  id: string
  title: string
  description: string
}

type ListProps = {
  name: string
  tasks: Task[]
  onAddTask: () => void
  onDeleteTask: (taskId: string) => void
  onEditTask: (taskId: string, updatedTask: { title: string; description: string }) => void
}

function List({ name, tasks, onAddTask, onDeleteTask, onEditTask }: ListProps) {
  return (
    <div className="list">
      <h3>{name}</h3>
      {tasks.map((task) => (
        <Card
          key={task.id}
          title={task.title}
          description={task.description}
          onDelete={() => onDeleteTask(task.id)}
          onEdit={(updatedTask) => onEditTask(task.id, updatedTask)}
        />
      ))}
      <button onClick={onAddTask}>Add Task</button>
    </div>
  )
}

export default List
