import { nanoid } from "nanoid";
import { create } from "zustand";
import { CreateTaskData, UpdateTaskData, type Task } from "./types";
import { taskRepository } from "./tasks.repository";

export type TasksStore = {
  tasks: Task[];
  getTaskById: (id: string) => Task | undefined;
  loadTasks: () => Promise<void>;
  createTask: (data: CreateTaskData) => Promise<void>;
  updateTask: (id: string, data: UpdateTaskData) => Promise<void>;
  removeTask: (userId: string) => Promise<void>;
};

export const useTasks = create<TasksStore>((set, get) => ({
  tasks: [],
  getTaskById: (id) => {
    return get().tasks.find((task) => task.id === id);
  },
  loadTasks: async () => {
    set({
      tasks: await taskRepository.getTasks(),
    });
  },
  createTask: async (data) => {
    const newTask = { id: nanoid(), ...data };
    await taskRepository.saveTask(newTask);
    set({
      tasks: await taskRepository.getTasks(),
    });
  },
  updateTask: async (id, data) => {
    const task = await taskRepository.getTask(id);
    if (!task) return;
    const newTask = { ...task, ...data };

    await taskRepository.saveTask(newTask);
    set({
      tasks: await taskRepository.getTasks(),
    });
  },
  removeTask: async (userId: string) => {
    await taskRepository.removeTask(userId);
    set({
      tasks: await taskRepository.getTasks(),
    });
  },
}));
