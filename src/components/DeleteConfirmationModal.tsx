import React, { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen) return null;

  const handleDelete = async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    try {
      await onConfirm();
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 text-center">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Are you sure you want to delete this task?
        </h2>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className={`px-6 py-2 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
              isDeleting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-800 text-white"
            }`}
          >
            {isDeleting ? (
              <>
                <AiOutlineLoading3Quarters className="animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </button>
          <button
            onClick={onClose}
            disabled={isDeleting}
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
