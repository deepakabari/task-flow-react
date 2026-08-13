export type Task = {
  id: string;
  title: string;
  description: string;
};

export type List = {
  id: number;
  name: string;
  tasks: Task[];
};

const mockLists: List[] = [
  {
    id: 1,
    name: "To Do",
    tasks: [
      { id: "abc123", title: "Design schema", description: "Plan the DB tables" },
      { id: "def456", title: "Setup CI", description: "Add GitHub Actions" },
    ],
  },
  {
    id: 2,
    name: "In Progress",
    tasks: [{ id: "ghi789", title: "Build API", description: "REST endpoints for tasks" }],
  },
  { id: 3, name: "Done", tasks: [] },
];

export function fetchLists(): Promise<List[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockLists), 500);
  });
}

// export function fetchLists(): Promise<List[]> {
//   return Promise.resolve(mockLists);
// }