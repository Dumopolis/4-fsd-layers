import { create } from "zustand";
import { Task } from "./types";
import { taskRepository } from "./tasks.repository";

export type TaskStore = {
  board: Task | undefined;
  isLoading?: boolean;
  error?: string;
  loadTask: () => Promise<void>;
  saveTask: (value: Task) => Promise<void>;
};

export const createTaskStore = ({ boardId }: { boardId: string }) => {
  return create<TaskStore>((set) => ({
    board: undefined,
    error: undefined,
    isLoading: false,
    loadTask: async () => {
      set({ isLoading: true });
      const board = await taskRepository.getTask(boardId).finally(() => {
        set({ isLoading: false });
      });
      set({ board });
    },
    saveTask: async (value: Task) => {
      await taskRepository.saveTask(value);
      set({ board: value });
    },
  }));
};
