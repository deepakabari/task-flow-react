import { useState } from "react"
import { useDispatch } from "react-redux"
import { deleteTask, editTask } from "../store/tasksSlice"

type CardProps = {
  title: string
  description: string
  listId: number
  taskId: string
}

function Card({ title, description, listId, taskId }: CardProps) {
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(title)
  const [editDescription, setEditDescription] = useState(description)

  const handleDelete = () => {
    dispatch(deleteTask({ listId, taskId }))
  }

  const handleEdit = () => {
    dispatch(editTask({ listId, taskId, updates: { title: editTitle, description: editDescription } }))
    setIsEditing(false)
  }

  return isEditing ? (
    <div className="card">
      <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
      <input type="text" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
      <button
        onClick={() => {
          handleEdit()
        }}
      >
        Save
      </button>
      <button
        onClick={() => {
          setEditTitle(title)
          setEditDescription(description)
          setIsEditing(false)
        }}
      >
        Cancel
      </button>
    </div>
  ) : (
    <div className="card">
      <h4>{title}</h4>
      <p>{description}</p>
      <button
        onClick={() => {
          setEditTitle(title)
          setEditDescription(description)
          setIsEditing(true)
        }}
      >
        Edit
      </button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default Card
