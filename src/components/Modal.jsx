import React, { useEffect, useState } from 'react';
import { Link,useLocation, useNavigate } from 'react-router-dom';

const ConfirmNavigationModal = ({ isOpen, onDiscard, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div style={{zIndex:1000}} className="fixed inset-0 w-full h-full flex items-center justify-center  bg-black bg-opacity-70">      <div className="bg-white dark:bg-customBlue rounded-lg p-6 shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Confirm navigation</h2>
        <p className="mb-6">There are unsaved changes. Navigating away will cause these changes to be lost.</p>
        <div className="flex justify-end space-x-2">
          <Link
            to='/products'
            onClick={onDiscard}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Discard changes
          </Link>
          <button
            onClick={onCancel}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Cancel navigation
          </button>
        </div>
      </div>
    </div>
  );
};

const Modal = ({ isDisabled }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const location = useLocation()

    const current = location.pathname
useEffect(()=>{

  if(current!==window.location.pathname){
    setIsModalOpen(true)
    console.log('ture')
  }
},[current])
  
    useEffect(() => {
      const handlePopState = (event) => {
        if (isDisabled ) {
          event.preventDefault();
          setIsModalOpen(true);
          window.history.pushState(null, null, window.location.pathname); // Prevent actual back navigation
        }
      };
  
      window.addEventListener('popstate', handlePopState);
  
      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    }, [isDisabled]);
  
    // Ensure modal state is managed properly
    useEffect(() => {
      if (isDisabled) {
        window.history.pushState(null, null, window.location.pathname);
      }
    }, [isDisabled]);
  
    const handleDiscard = () => {
      // Handle discard changes logic here
      setIsModalOpen(false);
    };
  
    const handleCancel = () => {
      // Handle cancel navigation logic here
      setIsModalOpen(false);
    };
  
    return (
      <div className="p-4">
        <ConfirmNavigationModal
          isOpen={isModalOpen}
          onDiscard={handleDiscard}
          onCancel={handleCancel}
        />
      </div>
    );
  };
  
  export default Modal;



