import React, { useEffect, useState } from "react";
import axios from "axios";

const BooksManagement = () => {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    book_name: "",
    book_cat_id: "",
    book_collection_id: "",
    book_launch_date: "",
    book_publisher: "",
  });
  const [editingBookId, setEditingBookId] = useState(null);
  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    fetchBooks();
  }, []);

  // Fetch all books
  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:5004/book", {
        headers: { Authorization: `Bearer ${API_KEY}` },
      });
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

// Add new book
const handleAddBook = async (e) => {
    e.preventDefault();

    try {
        if (!form.book_name || !form.book_cat_id || !form.book_collection_id || !form.book_launch_date || !form.book_publisher) {
            alert("All fields are required!");
            return;
        }

        const formattedDate = new Date(form.book_launch_date).toISOString().split("T")[0];

        const newBook = {
            book_name: form.book_name,
            book_cat_id: Number(form.book_cat_id), 
            book_collection_id: Number(form.book_collection_id),
            book_launch_date: formattedDate,
            book_publisher: form.book_publisher
        };

        // console.log("Sending data to backend:", newBook);

        const response = await axios.post("http://localhost:5004/book", newBook, {
            headers: { Authorization: `Bearer ${API_KEY}` }
        });

        console.log("Book added:", response.data);
        fetchBooks();

        setForm({ book_name: "", book_cat_id: "", book_collection_id: "", book_launch_date: "", book_publisher: "" });
        alert("Book added successfully!")
    } catch (error) {
        console.error("Error adding book:", error.response?.data || error);
    }
};

const handleEditBook = async (e) => {
    e.preventDefault();
    try {
        if (!form.book_name || !form.book_cat_id || !form.book_collection_id || !form.book_launch_date || !form.book_publisher) {
            alert("All fields are required!");
            return;
        }

        const formattedDate = new Date(form.book_launch_date).toISOString().split("T")[0];

        const updatedBook = {
            book_name: form.book_name,
            book_cat_id: Number(form.book_cat_id),
            book_collection_id: Number(form.book_collection_id),
            book_launch_date: formattedDate,
            book_publisher: form.book_publisher
        };

        await axios.put(`http://localhost:5004/book/${editingBookId}`, updatedBook, {
            headers: { Authorization: `Bearer ${API_KEY}` },
        });

        fetchBooks();
        setForm({ book_name: "", book_cat_id: "", book_collection_id: "", book_launch_date: "", book_publisher: "" });
        setEditingBookId(null);
        alert("Book updated successfully!");
    } catch (error) {
        console.error("Error updating book:", error.response?.data || error);
    }
};


const handleDeleteBook = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this book?");
    if (!confirmDelete) return;

    try {
        await axios.delete(`http://localhost:5004/book/${id}`, {
            headers: { Authorization: `Bearer ${API_KEY}` }
        });

        alert("Book deleted successfully!");
        fetchBooks();
    } catch (error) {
        console.error("Error deleting book:", error.response?.data || error);
        alert("Failed to delete book");
    }
};

  // Populate form when editing
  const handleEditClick = (book) => {
    setEditingBookId(book.book_id);
    setForm({
      book_name: book.book_name,
      book_cat_id: book.book_cat_id,
      book_collection_id: book.book_collection_id,
      book_launch_date: new Date(book.book_launch_date).toISOString().split("T")[0],
      book_publisher: book.book_publisher,
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Book Management</h2>

      {/* Form for Adding/Editing */}
      <form onSubmit={editingBookId ? handleEditBook : handleAddBook} className="mb-6">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="book_name"
            placeholder="Book Name"
            value={form.book_name}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
          <input
            type="number"
            name="book_cat_id"
            placeholder="Category ID"
            value={form.book_cat_id}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
          <input
            type="number"
            name="book_collection_id"
            placeholder="Collection ID"
            value={form.book_collection_id}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
          <input
            type="date"
            name="book_launch_date"
            value={form.book_launch_date}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
          <input
            type="text"
            name="book_publisher"
            placeholder="Publisher"
            value={form.book_publisher}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-4">
          {editingBookId ? "Update Book" : "Add Book"}
        </button>
      </form>

      {/* Books Table */}
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Book Name</th>
            <th className="border px-4 py-2">Category ID</th>
            <th className="border px-4 py-2">Collection ID</th>
            <th className="border px-4 py-2">Launch Date</th>
            <th className="border px-4 py-2">Publisher</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books.map((book) => (
              <tr key={book.book_id} className="text-center">
                <td className="border px-4 py-2">{book.book_name}</td>
                <td className="border px-4 py-2">{book.book_cat_id}</td>
                <td className="border px-4 py-2">{book.book_collection_id}</td>
                <td className="border px-4 py-2">
                  {new Date(book.book_launch_date).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">{book.book_publisher}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleEditClick(book)}
                    className="bg-yellow-500 text-white px-2 py-1 mx-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteBook(book.book_id)}
                    className="bg-red-500 text-white px-2 py-1 mx-1"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4 text-gray-500">
                No books found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BooksManagement;
