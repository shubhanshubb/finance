import React from "react";

const DeleteExpense = ({ onCancel, onDelete, expenseIndex }) => {
  const handleCancel = () => {
    onCancel();
  };

  const handleDelete = () => {
    onDelete(expenseIndex);
    onCancel();
  };

  return (
    <div className="flex flex-col px-5 py-3 border-2 border-black rounded">
      <h1 className="text-black text-sm font-semibold">
        Are you sure you want to delete this expense?
      </h1>

      <div className="flex flex-row mt-5 px-28 py-1">
        <button
          type="button"
          onClick={handleCancel}
          className="border-2 w-24 mr-5 border-red-500 text-white text-sm justify-items-end bg-red-500"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="border-2 w-28 border-green-500 text-white text-sm justify-items-end bg-green-500"
        >
          Yes, Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteExpense;
