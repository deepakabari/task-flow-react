import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { List as ListType, Task } from "../api/tasks"

const initialState: ListType[] = []

const taskSlice = createSlice({
  name: "tasks",
  initialState: initialState,
  reducers: {
    setLists: (_state, action: PayloadAction<ListType[]>) => {
      // state.push(...action.payload) // one way if you want to push to the existing state
      return action.payload // another way to provide a wholesome replacement
    },

    addTask: (state, action: PayloadAction<{ listId: number; task: Task }>) => {
      const list = state.find((list) => list.id === action.payload.listId)
      if (list) {
        list.tasks.push(action.payload.task)
      }
    },

    deleteTask: (state, action: PayloadAction<{ listId: number; taskId: string }>) => {
      const list = state.find((list) => list.id === action.payload.listId)
      if (list) {
        list.tasks = list.tasks.filter((task) => task.id !== action.payload.taskId)
      }
    },

    editTask: (
      state,
      action: PayloadAction<{ listId: number; taskId: string; updates: { title: string; description: string } }>,
    ) => {
      const list = state.find((list) => list.id === action.payload.listId)
      if (list) {
        list.tasks = list.tasks.map((task) =>
          task.id === action.payload.taskId ? { ...task, ...action.payload.updates } : task,
        )
      }
    },
  },
})

export const { setLists, addTask, deleteTask, editTask } = taskSlice.actions
export default taskSlice.reducer
