import { useTasks } from "@/entities/tasks";
import { RemoveIcon } from "@/shared/ui/ui-icons";
import { useGetConfirmation } from "@/shared/lib/confirmation";

function useRemoveTask() {
  const getConfirmation = useGetConfirmation();

  const { removeTask } = useTasks();

  return async (taskId: string) => {
    const confirmation = await getConfirmation({
      description: "Вы действительно хотите удалить задачу?",
    });

    if (!confirmation) return;

    await removeTask(taskId);
  };
}

export function RemoveTaskButton({ taskId }: { taskId: string }) {
  const removeTask = useRemoveTask();

  return (
    <button onClick={() => removeTask(taskId)}>
      <RemoveIcon className="w-8 h-8 text-rose-500" />
    </button>
  );
}
