import React from 'react';

const ConfirmationModal = ({ isOpen, onConfirm, onCancel, message, status }) => {
  if (!isOpen) return null;

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-600 dark:bg-green-500';
      case 'shipped':
        return 'bg-green-300 dark:bg-green-400';
      case 'cancelled':
        return 'bg-red-500 dark:bg-red-400';
      case 'paymentsettled':
        return 'bg-blue-500 dark:bg-blue-400';
      default:
        return 'bg-blue-500 dark:bg-blue-400';
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4 dark:text-white">Confirmation</h2>
        <p className="mb-6 dark:text-gray-200">{message}</p>
        <div className="flex justify-end">
          <button 
            onClick={onCancel} 
            className="mr-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-4 py-2 rounded-md"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm} 
            className={`${getStatusColor(status)} text-white px-4 py-2 rounded-md`}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
