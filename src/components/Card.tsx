import { memo, useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { deleteTask, editTask } from "../store/tasksSlice"

type CardProps = {
  title: string
  description: string
  listId: number
  taskId: string
  boardId: string
}

function Card({ title, description, listId, taskId, boardId }: CardProps) {
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(title)
  const [editDescription, setEditDescription] = useState(description)
  const titleInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing && titleInputRef.current) {
      titleInputRef.current.focus()
    }
  }, [isEditing])
  
  const handleDelete = () => {
    dispatch(deleteTask({ boardId, listId, taskId }))
  }

  const handleEdit = () => {
    dispatch(editTask({ boardId, listId, taskId, updates: { title: editTitle, description: editDescription } }))
    setIsEditing(false)
  }

  return isEditing ? (
    <div className="card">
      <input ref={titleInputRef} type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
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

export default memo(Card)
