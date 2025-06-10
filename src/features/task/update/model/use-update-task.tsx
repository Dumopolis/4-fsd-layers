import { UpdateTaskData, useTasks } from "@/entities/tasks";

export function useUpdateTask(taskId: string) {
  const updateModalRaw = useTasks((s) => s.updateTask);

  const updateTask = async (data: UpdateTaskData, onUpdate: () => void) => {
    await updateModalRaw(taskId, data);
    onUpdate();
  };

  return { updateTask };
}
