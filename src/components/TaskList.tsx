import { useState, useEffect, useRef } from "react";
import { getTasks, deleteTask, updateTask } from "../api/taskApi";
import AddTaskModal from "./AddTaskModal";
import TaskCard from "./TaskCard";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { Task } from "../types/task";

const TaskList = () => {
  // State to store all tasks
  const [tasks, setTasks] = useState<Task[]>([]);

  // State to control the number of tasks displayed initially
  const [visibleTasks, setVisibleTasks] = useState(10);

  // States for handling modals and loading states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loadingTaskId, setLoadingTaskId] = useState<number | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);

  // Reference for detecting when the user reaches the bottom of the list
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  // Intersection Observer to trigger loading more tasks when scrolling down
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // If the observer detects that the user has reached the bottom
        if (entries[0].isIntersecting && visibleTasks < tasks.length) {
          setVisibleTasks((prev) => prev + 10); // Load 10 more tasks
        }
      },
      { threshold: 1.0 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [visibleTasks, tasks.length]);

  // Function to fetch the task list from the API
  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to toggle task completion status
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

  // Function to open the delete confirmation modal
  const handleDeleteTask = (id: number) => {
    setTaskToDelete(id);
    setIsDeleteModalOpen(true);
  };

  // Function to confirm and delete a task
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
      {/* Header with title and Add Task button */}
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-black">Task List</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-purple-500 dark:bg-purple-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-purple-700 flex items-center text-sm sm:text-base"
        >
          Add Task
        </button>
      </div>

      {/* Add Task Modal */}
      {isModalOpen && (
        <AddTaskModal
          onClose={() => setIsModalOpen(false)}
          refreshTasks={fetchTasks}
        />
      )}

      {/* Task List */}
      <div className="space-y-4">
        {tasks.length > 0 ? (
          tasks
            .slice(0, visibleTasks)
            .map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                loadingTaskId={loadingTaskId}
                onToggleComplete={handleToggleComplete}
                onDelete={handleDeleteTask}
              />
            ))
        ) : (
          <h2 className="text-gray-500 text-center text-lg !bg-white rounded-lg py-5">
            No record
          </h2>
        )}
      </div>

      {/* Hidden element to trigger loading more tasks when reached */}
      {visibleTasks < tasks.length && (
        <div ref={loadMoreRef} className="h-10"></div>
      )}

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
