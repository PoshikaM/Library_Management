import React, { useEffect, useState } from "react";
import axios from "axios";

const TopBorrowedBooks = () => {
  const [books, setBooks] = useState([]);
  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    fetchTopBorrowedBooks();
  }, []);

  const fetchTopBorrowedBooks = async () => {
    try {
      const response = await axios.get("http://localhost:5004/task/top-borrowed-books", {
        headers: { Authorization: `Bearer ${API_KEY}` },
      });
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching top borrowed books:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Top 3 Most Borrowed Books</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Book Name</th>
            <th className="border px-4 py-2"># of Times Borrowed</th>
            <th className="border px-4 py-2"># of Unique Members</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books.map((book, index) => (
              <tr key={index} className="text-center">
                <td className="border px-4 py-2">{book.book_name}</td>
                <td className="border px-4 py-2">{book.times_borrowed}</td>
                <td className="border px-4 py-2">{book.unique_members}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center py-4 text-gray-500">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TopBorrowedBooks;