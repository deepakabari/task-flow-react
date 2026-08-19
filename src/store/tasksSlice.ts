import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Board as BoardType, Task } from "../api/tasks"

const initialState: BoardType[] = []

const taskSlice = createSlice({
  name: "tasks",
  initialState: initialState,
  reducers: {
    setBoards: (_state, action: PayloadAction<BoardType[]>) => {
      // state.push(...action.payload) // one way if you want to push to the existing state
      return action.payload // another way to provide a wholesome replacement
    },

    addTask: (state, action: PayloadAction<{ boardId: string; listId: number; task: Task }>) => {
      const board = state.find((b) => b.id === action.payload.boardId)
      if (board) {
        const list = board.lists.find((list) => list.id === action.payload.listId)
        if (list) {
          list.tasks.push(action.payload.task)
        }
      }
    },

    deleteTask: (state, action: PayloadAction<{ boardId: string; listId: number; taskId: string }>) => {
      const board = state.find((b) => b.id === action.payload.boardId)
      if (board) {
        const list = board.lists.find((list) => list.id === action.payload.listId)
        if (list) {
          list.tasks = list.tasks.filter((task) => task.id !== action.payload.taskId)
        }
      }
    },

    editTask: (
      state,
      action: PayloadAction<{
        boardId: string
        listId: number
        taskId: string
        updates: { title: string; description: string }
      }>,
    ) => {
      const board = state.find((b) => b.id === action.payload.boardId)
      if (board) {
        const list = board.lists.find((list) => list.id === action.payload.listId)
        if (list) {
          list.tasks = list.tasks.map((task) =>
            task.id === action.payload.taskId ? { ...task, ...action.payload.updates } : task,
          )
        }
      }
    },
  },
})

export const { setBoards, addTask, deleteTask, editTask } = taskSlice.actions
export default taskSlice.reducer
