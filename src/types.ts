export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export interface List {
  id: number;
  title: string;
  tasks: Task[];
}

export interface Board {
  id: number;
  title: string;
  lists: List[];
}