import { memo, useEffect, useReducer, useRef } from "react"
import { useDispatch } from "react-redux"
import { deleteTask, editTask } from "../store/tasksSlice"

type CardProps = {
  title: string
  description: string
  listId: number
  taskId: string
  boardId: string
}

type ReducerType = {
  isEditing: boolean
  editTitle: string
  editDescription: string
}

type ReducerActionType =
  | {
      type: "START_EDIT"
      title: string
      description: string
    }
  | {
      type: "SET_TITLE"
      title: string
    }
  | {
      type: "SET_DESCRIPTION"
      description: string
    }
  | {
      type: "CANCEL_EDIT"
      title: string
      description: string
    }
  | { type: "SAVE_EDIT" }

function editReducer(state: ReducerType, action: ReducerActionType): ReducerType {
  switch (action.type) {
    case "START_EDIT":
      return {
        isEditing: true,
        editTitle: action.title,
        editDescription: action.description,
      }
    case "SET_TITLE":
      return {
        ...state,
        editTitle: action.title,
      }
    case "SET_DESCRIPTION":
      return {
        ...state,
        editDescription: action.description,
      }
    case "CANCEL_EDIT":
      return {
        isEditing: false,
        editTitle: action.title,
        editDescription: action.description,
      }
    case "SAVE_EDIT":
      return {
        ...state,
        isEditing: false,
      }
    default:
      return state
  }
}

function Card({ title, description, listId, taskId, boardId }: CardProps) {
  const dispatch = useDispatch()
  // const [isEditing, setIsEditing] = useState(false)
  // const [editTitle, setEditTitle] = useState(title)
  // const [editDescription, setEditDescription] = useState(description)
  const [state, dispatchEdit] = useReducer(editReducer, {
    isEditing: false,
    editTitle: title,
    editDescription: description,
  })
  const titleInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (state.isEditing && titleInputRef.current) {
      titleInputRef.current.focus()
    }
  }, [state.isEditing])

  const handleDelete = () => {
    dispatch(deleteTask({ boardId, listId, taskId }))
  }

  const handleEdit = () => {
    dispatch(
      editTask({ boardId, listId, taskId, updates: { title: state.editTitle, description: state.editDescription } }),
    )
    // setIsEditing(false)
    dispatchEdit({ type: "SAVE_EDIT" })
  }

  return state.isEditing ? (
    <div className="card">
      <input
        ref={titleInputRef}
        type="text"
        value={state.editTitle}
        onChange={(e) => dispatchEdit({ type: "SET_TITLE", title: e.target.value })}
      />
      <input
        type="text"
        value={state.editDescription}
        onChange={(e) => dispatchEdit({ type: "SET_DESCRIPTION", description: e.target.value })}
      />
      <button
        onClick={() => {
          handleEdit()
        }}
      >
        Save
      </button>
      <button onClick={() => dispatchEdit({ type: "CANCEL_EDIT", title, description })}>Cancel</button>
    </div>
  ) : (
    <div className="card">
      <h4>{title}</h4>
      <p>{description}</p>
      <button onClick={() => dispatchEdit({ type: "START_EDIT", title, description })}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default memo(Card)
