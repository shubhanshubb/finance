"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import NewExpenseForm from "./NewExpenseForm";
import { MdDelete } from "react-icons/md";
import { RiPencilFill } from "react-icons/ri";
import DeleteExpense from "./DeleteExpense";
import "./styles.css";

const page = () => {
  const [expenses, setExpenses] = useState([]);

  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddExpense = (
    expenseName,
    description,
    selectedCategory,
    selectedDate,
    amount
  ) => {
    if (selectedCategory && selectedCategory.label) {
      const updatedExpenses = [...expenses];

      if (editIndex !== null) {
        updatedExpenses[editIndex] = {
          expenseName: expenseName,
          description: description,
          selectedCategory: selectedCategory,
          selectedDate: selectedDate,
          amount: amount,
        };
      } else {
        updatedExpenses.push({
          expenseName: expenseName,
          description: description,
          selectedCategory: selectedCategory,
          selectedDate: selectedDate,
          amount: amount,
        });
      }

      setExpenses(updatedExpenses);

      localStorage.setItem("expenses", JSON.stringify(updatedExpenses));

      setShowModal(false);
      setEditIndex(null);
    } else {
      console.error("Selected category is not properly set.");
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleEditExpense = (index) => {
    setEditIndex(index);
    setShowModal(true);
  };

  const handleDeleteExpense = (index) => {
    const updatedExpenses = [...expenses];
    updatedExpenses.splice(index, 1);
    setExpenses(updatedExpenses);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
    setDeleteModal(false);
  };

  const filteredExpenses = expenses.filter((expense) => {
    const searchTermLowerCase = searchTerm.toLowerCase();
    return (
      expense.expenseName.toLowerCase().includes(searchTermLowerCase) ||
      expense.description.toLowerCase().includes(searchTermLowerCase)
    );
  });

  return (
    <div className="bg-slate-50 h-screen p-5">
      <div className="container">
        <div className="filters flex flex-wrap items-center mb-4">
          <div className="header mb-4">
            <h1 className="text-black text-2xl font-semibold pt-5">
              MY EXPENSE MANAGER
            </h1>
          </div>
          <div className="w-full sm:w-1/2 lg:w-auto mb-3 sm:mb-0">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              placeholderText="Filter By Date of Expense"
              className="w-full border-2 border-black px-2 py-2 rounded"
            />
          </div>
          <div className="w-full sm:w-1/2 lg:w-auto mb-3 sm:mb-0">
            <input
              className="w-full border-2 border-black px-2 py-2 rounded text-black"
              placeholder="Search Expense By Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-auto">
            <button
              className="w-full sm:w-auto border-2 border-green-500 text-black px-2 py-2 rounded bg-green-500"
              onClick={() => setShowModal(true)}
            >
              + New Expense
            </button>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded shadow-lg">
              <NewExpenseForm
                onSubmit={handleAddExpense}
                onCancel={closeModal}
                expenseToEdit={editIndex !== null ? expenses[editIndex] : null}
              />
            </div>
          </div>
        )}
      </div>

      {/* Display Expenses */}
      <div className="mt-16 px-20 table-container">
        <table className="w-full ">
          <thead>
            <tr className="bg-stone-300 text-white">
              <th className="py-1 border-r-2 text-black text-sm">Name</th>
              <th className="py-1 border-r-2 text-black text-sm">
                Description
              </th>
              <th className="py-1 border-r-2 text-black text-sm">Category</th>
              <th className="py-1 border-r-2 text-black text-sm">
                Date of Expense
              </th>
              <th className="py-1 border-r-2 text-black text-sm">Amount</th>
              <th className="py-1 border-r-2 text-black text-sm"></th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.length > 0 ? (
              filteredExpenses.map((expense, index) => (
                <tr key={index}>
                  <td className="py-2 text-black text-center">
                    {expense.expenseName}
                  </td>
                  <td className="py-2 text-black text-center">
                    {expense.description}
                  </td>
                  <td className="py-2 text-black text-center">
                    {expense.selectedCategory.label}
                  </td>
                  <td className="py-2 text-black text-center">
                    {expense.selectedDate.toDateString()}
                  </td>
                  <td className="py-2 text-black text-center">
                    INR {expense.amount}
                  </td>
                  <td className="flex flex-row text-center">
                    <button
                      className="text-black text-2xl mt-3 ml-5 mr-5"
                      onClick={() => handleEditExpense(index)}
                    >
                      <RiPencilFill />
                    </button>
                    <button
                      className="text-red-700 text-2xl mt-3 "
                      onClick={() => setDeleteModal(true)}
                    >
                      <MdDelete />
                    </button>

                    {/* Modal */}
                    {deleteModal && (
                      <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="bg-white p-4 rounded shadow-lg">
                          <DeleteExpense
                            onCancel={() => setDeleteModal(false)}
                            onDelete={handleDeleteExpense}
                            expenseIndex={editIndex} // Pass the index of the expense to be deleted
                          />
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500 ">
                  No data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;
