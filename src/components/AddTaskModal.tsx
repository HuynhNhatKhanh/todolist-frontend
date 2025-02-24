import { useState } from "react";
import { addTask } from "../api/taskApi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const AddTaskModal = ({
  onClose,
  refreshTasks,
}: {
  onClose: () => void;
  refreshTasks: () => void;
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await addTask({ title, description, completed: false });
      setTitle("");
      setDescription("");
      refreshTasks();
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-[600px] h-auto max-w-[90%]">
        <h2 className="text-3xl font-bold mb-6 text-black">Add Task</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-semibold text-gray-700">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="text-gray-500 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Type your task here..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700">
              Description
            </label>
            <textarea
              className="text-gray-500 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Add more details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              className="px-5 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim() || isSubmitting}
              className={`px-6 py-2 rounded-lg text-white shadow-md transition flex items-center justify-center gap-2 ${
                !title.trim() || isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700"
              }`}
            >
              {isSubmitting ? (
                <>
                  <AiOutlineLoading3Quarters className="animate-spin" />
                  Processing...
                </>
              ) : (
                "Add"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
