// NewExpenseForm.js
import React, { useState, useEffect } from "react";
import DatePicker from 'react-datepicker';
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";

const NewExpenseForm = ({ onSubmit, onCancel, expenseToEdit }) => {
  const [expenseName, setExpenseName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [amount, setAmount] = useState("");

  const formTitle = expenseToEdit ? "Edit" : "Create New ";
  const buttonText = expenseToEdit ? "Update" : "Create";
  
  useEffect(() => {
    if (expenseToEdit) {
      setExpenseName(expenseToEdit.expenseName);
      setDescription(expenseToEdit.description);
      setSelectedCategory(expenseToEdit.selectedCategory);
      setSelectedDate(expenseToEdit.selectedDate);
      setAmount(expenseToEdit.amount);
    }
  }, [expenseToEdit]);

  const options = [
    { value: "health", label: "Health" },
    { value: "electronics", label: "Electronics" },
    { value: "travel", label: "Travel" },
    { value: "education", label: "Education" },
    { value: "books", label: "Books" },
    { value: "others", label: "Others" },
  ];

  const handleCancel = (e) => {
    e.preventDefault();
    onCancel();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(expenseName, description, selectedCategory, selectedDate, amount);
    setExpenseName("");
    setDescription("");
    setSelectedCategory("");
    setSelectedDate("");
    setAmount("");
  };

  return (
    <div className="flex flex-row px-5 py-5 border-2 border-black rounded">
      <form onSubmit={handleSubmit}>
        <h1 className="text-black text-xl font-semibold">{formTitle} Expense</h1>
        <div>
          <h2 className="text-black">Name</h2>
          <input
            type="text"
            value={expenseName}
            className="w-60 border-2 border-stone-200 px-1 py-1 placeholder-gray-600 pl-5 text-black bg-stone-200"
            onChange={(e) => setExpenseName(e.target.value)}
            placeholder="Name the Expense"
          />
        </div>
        <div>
          <h2 className="text-black">Description</h2>
          <input
            type="text"
            value={description}
            className="w-60 border-2 border-stone-200 px-1 py-1 placeholder-gray-600 pl-5 text-black bg-stone-200"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the Expense"
          />
        </div>
        <div>
          <h2 className="text-black">Category</h2>
          <Select
            options={options}
            value={selectedCategory} 
            onChange={(selectedOption) => setSelectedCategory(selectedOption)} 
            className="w-60 placeholder-gray-600 text-black bg-stone-200 border-none"
          />
        </div>
        <div>
          <h2 className="text-black">Date of Expense</h2>
          <DatePicker
          type="date"
            selected={selectedDate}
            onChange={date => setSelectedDate(date)}
            placeholderText="Select Date Expense"
            className="w-60 placeholder-gray-600 pl-5 text-black px-1 py-1 bg-stone-200 "
          />
        </div>
        <div>
          <h2 className="text-black">Expense Amount</h2>
          <input
            type="number"
            value={amount}
            className="w-60 border-2 border-stone-200 px-1 py-1 placeholder-gray-600 pl-5 text-black bg-stone-200"
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Expense Amount in INR"
          />
        </div>
        <div className="flex flex-row mt-5 px-1 py-1">
          <button
            type="button"
            onClick={handleCancel} 
            className="border-2 w-24 mr-5 border-slate-500 text-white text-sm justify-items-end bg-slate-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="border-2 w-28 border-green-500 text-white text-sm justify-items-end bg-green-500"
          >
            {buttonText} Expense
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewExpenseForm;
