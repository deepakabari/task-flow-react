import { useState } from "react"

type CardProps = {
  title: string
  description: string
  onDelete: () => void
  onEdit: (updatedTask: { title: string; description: string }) => void
}

function Card({ title, description, onDelete, onEdit }: CardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(title)
  const [editDescription, setEditDescription] = useState(description)

  return isEditing ? (
    <div className="card">
      <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
      <input type="text" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
      <button
        onClick={() => {
          onEdit({ title: editTitle, description: editDescription })
          setIsEditing(false)
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
      <button onClick={onDelete}>Delete</button>
    </div>
  )
}

export default Card
