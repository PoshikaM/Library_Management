import React, { useEffect, useState } from "react";
import axios from "axios";

const IssuanceList = () => {
  const [issuances, setIssuances] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL_ISS;
  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    fetchIssuances();
  }, []);

  const fetchIssuances = async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${API_KEY}` },
      });
      setIssuances(response.data);
    } catch (error) {
      console.error("Error fetching issuances:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Issuance List</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Book ID</th>
            <th className="border px-4 py-2">Member ID</th>
            <th className="border px-4 py-2">Issuance Date</th>
            <th className="border px-4 py-2">Issued By</th>
            <th className="border px-4 py-2">Return Date</th>
            <th className="border px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {issuances.length > 0 ? (
            issuances.map((issuance) => (
              <tr key={issuance.issuance_id} className="text-center">
                <td className="border px-4 py-2">{issuance.issuance_id}</td>
                <td className="border px-4 py-2">{issuance.book_id}</td>
                <td className="border px-4 py-2">{issuance.issuance_member_id}</td>
                <td className="border px-4 py-2">{new Date(issuance.issuance_date).toLocaleDateString()}</td>
                <td className="border px-4 py-2">{issuance.issued_by}</td>
                <td className="border px-4 py-2">{new Date(issuance.target_return_date).toLocaleDateString()}</td>
                <td className="border px-4 py-2">{issuance.issuance_status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-4 text-gray-500">
                No issuances available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default IssuanceList;
