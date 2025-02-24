import React, { useEffect, useState } from "react";
import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const Book = () => {
  const [books, setBooks] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL; // Update with your backend URL
  const API_KEY = import.meta.env.VITE_API_KEY; // Replace with your actual API key

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
        const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${API_KEY}` },
      });
      setBooks(response.data);
    } catch (error) {
    //   toast.error("Error fetching books!");
      console.error("Error fetching books:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* <ToastContainer /> */}
      <h2 className="text-2xl font-bold mb-4">Book List</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Category</th>
            <th className="border px-4 py-2">Collection</th>
            <th className="border px-4 py-2">Launch Date</th>
            <th className="border px-4 py-2">Publisher</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books.map((book) => (
              <tr key={book.book_id} className="text-center">
                <td className="border px-4 py-2">{book.book_id}</td>
                <td className="border px-4 py-2">{book.book_name}</td>
                <td className="border px-4 py-2">{book.book_cat_id}</td>
                <td className="border px-4 py-2">{book.book_collection_id}</td>
                <td className="border px-4 py-2">{new Date(book.book_launch_date).toLocaleDateString()}</td>
                <td className="border px-4 py-2">{book.book_publisher}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4 text-gray-500">
                No books available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Book;
