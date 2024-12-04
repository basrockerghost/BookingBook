import React from 'react';

interface SuccessBoxProps {
  message: string | null;
  count: number; // The count of how many times the success message appeared
  type: 'success' | 'error'; // Type to determine color
}

const SuccessBox: React.FC<SuccessBoxProps> = ({ message, count, type }) => {
  if (!message) return null;

  return (
    <div
      className={`fixed top-5 left-1/2 transform -translate-x-1/2 text-white px-4 py-2 mt-12 rounded shadow-lg transition-all duration-300 ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
      }`}
    >
      {message} {count > 1 && `*${count}`}
    </div>
  );
}

export default SuccessBox;
