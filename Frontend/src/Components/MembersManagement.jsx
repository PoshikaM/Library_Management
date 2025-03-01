import React, { useEffect, useState } from "react";
import axios from "axios";

const MembersManagement = () => {
  const [members, setMembers] = useState([]);
  const [form, setForm] = useState({
    mem_name: "",
    mem_phone: "",
    mem_email: "",
  });
  const [editingMemberId, setEditingMemberId] = useState(null);
  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await axios.get("http://localhost:5004/member", {
        headers: { Authorization: `Bearer ${API_KEY}` },
      });
      setMembers(response.data);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    try {
      if (!form.mem_name || !form.mem_phone || !form.mem_email) {
        alert("All fields are required!");
        return;
      }
      const newMember = { ...form };
      await axios.post("http://localhost:5004/member", newMember, {
        headers: { Authorization: `Bearer ${API_KEY}` },
      });
      fetchMembers();
      setForm({ mem_name: "", mem_phone: "", mem_email: "" });
      alert("Member added successfully!");
    } catch (error) {
      console.error("Error adding member:", error.response?.data || error);
    }
  };

  const handleEditMember = async (e) => {
    e.preventDefault();
    try {
      if (!form.mem_name || !form.mem_phone || !form.mem_email) {
        alert("All fields are required!");
        return;
      }
      const updatedMember = { ...form };
      await axios.put(`http://localhost:5004/member/${editingMemberId}`, updatedMember, {
        headers: { Authorization: `Bearer ${API_KEY}` },
      });
      fetchMembers();
      setForm({ mem_name: "", mem_phone: "", mem_email: "" });
      setEditingMemberId(null);
      alert("Member updated successfully!");
    } catch (error) {
      console.error("Error updating member:", error.response?.data || error);
    }
  };

  const handleDeleteMember = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this member?");
    if (!confirmDelete) return;
    try {
      await axios.delete(`http://localhost:5004/member/${id}`, {
        headers: { Authorization: `Bearer ${API_KEY}` },
      });
      alert("Member deleted successfully!");
      fetchMembers();
    } catch (error) {
      console.error("Error deleting member:", error.response?.data || error);
      alert("Failed to delete member");
    }
  };

  const handleEditClick = (member) => {
    setEditingMemberId(member.mem_id);
    setForm({
      mem_name: member.mem_name,
      mem_phone: member.mem_phone,
      mem_email: member.mem_email,
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Member Management</h2>
      <form onSubmit={editingMemberId ? handleEditMember : handleAddMember} className="mb-6">
        <div className="grid grid-cols-2 gap-4">
          <input type="text" name="mem_name" placeholder="Member Name" value={form.mem_name} onChange={handleChange} required className="border p-2 w-full" />
          <input type="text" name="mem_phone" placeholder="Phone" value={form.mem_phone} onChange={handleChange} required className="border p-2 w-full" />
          <input type="email" name="mem_email" placeholder="Email" value={form.mem_email} onChange={handleChange} required className="border p-2 w-full" />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-4">
          {editingMemberId ? "Update Member" : "Add Member"}
        </button>
      </form>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Phone</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.length > 0 ? (
            members.map((member) => (
              <tr key={member.mem_id} className="text-center">
                <td className="border px-4 py-2">{member.mem_name}</td>
                <td className="border px-4 py-2">{member.mem_phone}</td>
                <td className="border px-4 py-2">{member.mem_email}</td>
                <td className="border px-4 py-2">
                  <button onClick={() => handleEditClick(member)} className="bg-yellow-500 text-white px-2 py-1 mx-1">
                    Edit
                  </button>
                  <button onClick={() => handleDeleteMember(member.mem_id)} className="bg-red-500 text-white px-2 py-1 mx-1">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
                No members found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MembersManagement;
