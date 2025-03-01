import React, { useEffect, useState } from "react";
import axios from "axios";

const NeverBorrowedBooks = () => {
  const [books, setBooks] = useState([]);
  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5004/task/never-borrowed-books', {
        headers: { Authorization: `Bearer ${API_KEY}` },
      });
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Books Never Borrowed</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Book Name</th>
            <th className="border px-4 py-2">Publisher</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books.map((book, index) => (
              <tr key={index} className="text-center">
                <td className="border px-4 py-2">{book.book_name}</td>
                <td className="border px-4 py-2">{book.book_publisher}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="text-center py-4 text-gray-500">
                No books found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default NeverBorrowedBooks;
