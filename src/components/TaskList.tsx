import { useState, useEffect } from "react";
import { getTasks, deleteTask, updateTask } from "../api/taskApi";
import AddTaskModal from "./AddTaskModal";
import TaskCard from "./TaskCard";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { Task } from "../types/task";

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loadingTaskId, setLoadingTaskId] = useState<number | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  // Fetch the task list
  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Toggle task completion status
  const handleToggleComplete = async (id: number, completed: boolean) => {
    setLoadingTaskId(id);
    try {
      await updateTask(id, !completed);
      fetchTasks();
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingTaskId(null);
    }
  };

  // Open delete confirmation modal
  const handleDeleteTask = (id: number) => {
    setTaskToDelete(id);
    setIsDeleteModalOpen(true);
  };

  // Confirm and delete task
  const confirmDeleteTask = async () => {
    if (taskToDelete !== null) {
      try {
        await deleteTask(taskToDelete);
        fetchTasks();
      } catch (error) {
        console.log(error);
      } finally {
        setTaskToDelete(null);
        setIsDeleteModalOpen(false);
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-black">Task List</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-purple-500 text-black px-4 py-2 rounded-lg shadow-md hover:bg-purple-700 flex items-center text-sm sm:text-base"
        >
          Add Task
        </button>
      </div>

      {isModalOpen && (
        <AddTaskModal
          onClose={() => setIsModalOpen(false)}
          refreshTasks={fetchTasks}
        />
      )}

      {/* Task cards */}
      <div className="space-y-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              loadingTaskId={loadingTaskId}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDeleteTask}
            />
          ))
        ) : (
          <h2 className="text-gray-500 text-center text-lg bg-white rounded-lg py-5">
            No record
          </h2>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDeleteTask}
      />
    </div>
  );
};

export default TaskList;
