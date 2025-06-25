import { X, AlertTriangle } from 'lucide-react';

const DeleteConfirmModal = ({ task, onConfirm, onCancel, loading }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 animate-slide-up">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-100 rounded-full">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Delete Task</h3>
          </div>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-600 mb-2">
            Are you sure you want to delete this task? This action cannot be undone.
          </p>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="font-medium text-gray-900">{task?.title}</p>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3">
          <button
            onClick={onCancel}
            className="btn-secondary"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="btn-danger disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Delete Task'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;