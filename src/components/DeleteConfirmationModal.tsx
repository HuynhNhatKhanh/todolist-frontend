import React from "react";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 text-center">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Are you sure you want to delete this task?
        </h2>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="bg-purple-600 hover:bg-purple-800 text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
