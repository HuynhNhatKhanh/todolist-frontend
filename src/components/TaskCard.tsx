import { FaRegTrashAlt } from "react-icons/fa";
import { Tooltip } from "@mui/material";
import { Task } from "../types/task";

interface TaskCardProps {
  task: Task;
  loadingTaskId: number | null;
  onToggleComplete: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  loadingTaskId,
  onToggleComplete,
  onDelete,
}) => {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg shadow-md transition-all duration-300 bg-white">
      <div className="flex-1 min-w-0 pr-10">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {task.title}
        </h2>
        <p className="text-sm text-gray-500 truncate">{task.description}</p>
      </div>

      <div className="flex items-center gap-x-2">
        <Tooltip
          title={task.completed ? "Mark as Incomplete" : "Mark as Complete"}
        >
          <button
            onClick={() => onToggleComplete(task.id, task.completed)}
            className={`
              w-6 h-6 flex items-center justify-center
              rounded-md text-black font-semibold
              sm:w-8 sm:h-8
              ${
                task.completed
                  ? "!bg-green-200 hover:!bg-green-300"
                  : "!bg-gray-200 hover:!bg-gray-300"
              }
            `}
            disabled={loadingTaskId === task.id}
          >
            {loadingTaskId === task.id ? "..." : task.completed ? "✓" : "✗"}
          </button>
        </Tooltip>
        <Tooltip title="Delete Task">
          <button
            onClick={() => onDelete(task.id)}
            className="text-red-500 hover:text-red-700"
          >
            <FaRegTrashAlt className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default TaskCard;
