import React, { useEffect, useState } from "react";
import axios from "axios";

const OutstandingBooks = () => {
  const [books, setBooks] = useState([]);
  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    fetchOutstandingBooks();
  }, []);

  const fetchOutstandingBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5004/task/outstanding-books', {
        headers: { Authorization: `Bearer ${API_KEY}` },
      });
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching outstanding books:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Outstanding Books</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Member Name</th>
            <th className="border px-4 py-2">Book Name</th>
            <th className="border px-4 py-2">Author</th>
            <th className="border px-4 py-2">Issued Date</th>
            <th className="border px-4 py-2">Target Return Date</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books.map((book, index) => (
              <tr key={index} className="text-center">
                <td className="border px-4 py-2">{book.member_name}</td>
                <td className="border px-4 py-2">{book.book_name}</td>
                <td className="border px-4 py-2">{book.author}</td>
                <td className="border px-4 py-2">
                  {new Date(book.issuance_date).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">
                  {new Date(book.target_return_date).toLocaleDateString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-500">
                No outstanding books found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OutstandingBooks;