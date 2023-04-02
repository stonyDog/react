//Task.ts
interface Task {
  id: string;
  title: string;
  dueDate: Date | null;
  completed: boolean;
}

export default Task;