import React, { useEffect, useState } from "react";
import axios from "axios";

const IssuanceManagement = () => {
  const [issuances, setIssuances] = useState([]);
  const [form, setForm] = useState({
    book_id: "",
    issuance_member_id: "",
    issuance_date: "",
    issued_by: "",
    target_return_date: "",
    issuance_status: ""
  });
  const [editingIssuanceId, setEditingIssuanceId] = useState(null);
  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    fetchIssuances();
  }, []);

  const fetchIssuances = async () => {
    try {
      const response = await axios.get("http://localhost:5004/issuance", {
        headers: { Authorization: `Bearer ${API_KEY}` },
      });
      setIssuances(response.data);
    } catch (error) {
      console.error("Error fetching issuances:", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdateIssuance = async (e) => {
    e.preventDefault();
    try {
      if (!form.book_id || !form.issuance_member_id || !form.issuance_date || !form.issued_by || !form.target_return_date || !form.issuance_status) {
        alert("All fields are required!");
        return;
      }

      const formattedIssuance = {
        book_id: Number(form.book_id),
        issuance_member_id: Number(form.issuance_member_id),
        issuance_date: new Date(form.issuance_date).toISOString().split("T")[0],
        issued_by: form.issued_by,
        target_return_date: new Date(form.target_return_date).toISOString().split("T")[0],
        issuance_status: form.issuance_status,
      };

      if (editingIssuanceId) {
        await axios.put(`http://localhost:5004/issuance/${editingIssuanceId}`, formattedIssuance, {
          headers: { Authorization: `Bearer ${API_KEY}` },
        });
        alert("Issuance updated successfully!");
      } else {
        await axios.post("http://localhost:5004/issuance", formattedIssuance, {
          headers: { Authorization: `Bearer ${API_KEY}` },
        });
        alert("Issuance added successfully!");
      }

      fetchIssuances();
      setForm({ book_id: "", issuance_member_id: "", issuance_date: "", issued_by: "", target_return_date: "", issuance_status: "" });
      setEditingIssuanceId(null);
    } catch (error) {
      console.error("Error adding/updating issuance:", error.response?.data || error);
    }
  };

  const handleEditClick = (issuance) => {
    setEditingIssuanceId(issuance.issuance_id);
    setForm({
      book_id: issuance.book_id,
      issuance_member_id: issuance.issuance_member_id,
      issuance_date: new Date(issuance.issuance_date).toISOString().split("T")[0],
      issued_by: issuance.issued_by,
      target_return_date: new Date(issuance.target_return_date).toISOString().split("T")[0],
      issuance_status: issuance.issuance_status,
    });
  };

  const handleDeleteIssuance = async (id) => {
    if (!window.confirm("Are you sure you want to delete this issuance?")) return;
    try {
      await axios.delete(`http://localhost:5004/issuance/${id}`, {
        headers: { Authorization: `Bearer ${API_KEY}` },
      });
      fetchIssuances();
      alert("Issuance deleted successfully!");
    } catch (error) {
      console.error("Error deleting issuance:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Issuance Management</h2>
      <form onSubmit={handleAddOrUpdateIssuance} className="mb-6">
        <div className="grid grid-cols-2 gap-4">
          <input type="number" name="book_id" placeholder="Book ID" value={form.book_id} onChange={handleChange} required className="border p-2 w-full" />
          <input type="number" name="issuance_member_id" placeholder="Member ID" value={form.issuance_member_id} onChange={handleChange} required className="border p-2 w-full" />
          <input type="date" name="issuance_date" value={form.issuance_date} onChange={handleChange} required className="border p-2 w-full" />
          <input type="text" name="issued_by" placeholder="Issued By" value={form.issued_by} onChange={handleChange} required className="border p-2 w-full" />
          <input type="date" name="target_return_date" value={form.target_return_date} onChange={handleChange} required className="border p-2 w-full" />
          <input type="text" name="issuance_status" placeholder="Status" value={form.issuance_status} onChange={handleChange} required className="border p-2 w-full" />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-4">
          {editingIssuanceId ? "Update Issuance" : "Add Issuance"}
        </button>
      </form>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Book ID</th>
            <th className="border px-4 py-2">Member ID</th>
            <th className="border px-4 py-2">Issuance Date</th>
            <th className="border px-4 py-2">Issued By</th>
            <th className="border px-4 py-2">Target Return Date</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {issuances.length > 0 ? (
            issuances.map((issuance) => (
              <tr key={issuance.issuance_id} className="text-center">
                <td className="border px-4 py-2">{issuance.book_id}</td>
                <td className="border px-4 py-2">{issuance.issuance_member_id}</td>
                <td className="border px-4 py-2">{new Date(issuance.issuance_date).toLocaleDateString()}</td>
                <td className="border px-4 py-2">{issuance.issued_by}</td>
                <td className="border px-4 py-2">{new Date(issuance.target_return_date).toLocaleDateString()}</td>
                <td className="border px-4 py-2">{issuance.issuance_status}</td>
                <td className="border px-4 py-2">
                  <button onClick={() => handleEditClick(issuance)} className="bg-yellow-500 text-white px-2 py-1 mx-1">Edit</button>
                  <button onClick={() => handleDeleteIssuance(issuance.issuance_id)} className="bg-red-500 text-white px-2 py-1 mx-1">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-4 text-gray-500">No issuances found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default IssuanceManagement;