export type Task = {
  id: string
  title: string
  description: string
}

export type List = {
  id: number
  name: string
  tasks: Task[]
}

export type Board = {
  id: string
  name: string
  lists: List[]
}

const mockBoards: Board[] = [
  {
    id: "board-a",
    name: "Board A",
    lists: [
      {
        id: 1,
        name: "To Do",
        tasks: [
          {
            id: "abc123",
            title: "Design schema",
            description: "Plan the DB tables",
          },
          {
            id: "def456",
            title: "Setup CI",
            description: "Add GitHub Actions",
          },
        ],
      },
      {
        id: 2,
        name: "In Progress",
        tasks: [
          {
            id: "ghi789",
            title: "Build API",
            description: "REST endpoints for tasks",
          },
        ],
      },
      {
        id: 3,
        name: "Done",
        tasks: [],
      },
    ],
  },
  {
    id: "board-b",
    name: "Board B",
    lists: [
      {
        id: 4,
        name: "Backlog",
        tasks: [
          {
            id: "jkl012",
            title: "Write docs",
            description: "Document the API",
          },
        ],
      },
      {
        id: 5,
        name: "Completed",
        tasks: [
          {
            id: "mno345",
            title: "Create project",
            description: "Initialize the repository",
          },
        ],
      },
    ],
  },
]

export function fetchBoards(): Promise<Board[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockBoards), 500)
  })
}

// export function fetchBoards(): Promise<Board[]> {
//   return Promise.resolve(mockBoards);
// }
