import { persistStorage } from "@/shared/lib/persist-storage";
import { Task } from "./types";

const BOARDS_STORAGE_KEY = "tasks_storsage";
export const taskRepository = {
  getTasks: async (): Promise<Task[]> => {
    return persistStorage.getItemSafe<Task[]>(BOARDS_STORAGE_KEY, []);
  },
  getTask: async (id: string): Promise<Task | undefined> => {
    return persistStorage
      .getItemSafe<Task[]>(BOARDS_STORAGE_KEY, [])
      .then((tasks) => tasks.find((task) => task.id === id));
  },
  saveTask: async (value: Task) => {
    const tasks = await taskRepository.getTasks();
    const taskIndex = tasks.findIndex((task) => task.id === value.id);

    if (taskIndex === -1) {
      tasks.push(value);
    } else {
      tasks[taskIndex] = value;
    }

    await persistStorage.setItemSafe(BOARDS_STORAGE_KEY, tasks);
  },
  removeTask: async (taskId: string) => {
    const tasks = await taskRepository.getTasks();
    await persistStorage.setItemSafe(
      BOARDS_STORAGE_KEY,
      tasks.filter((task) => task.id !== taskId),
    );
  },
};
