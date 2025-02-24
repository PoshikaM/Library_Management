import { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;  // ✅ Secure API Key
const BASE_URL = import.meta.env.VITE_BACKEND_URL;  // ✅ Backend URL

const Members = () => {
    const [members, setMembers] = useState([]);
    const [error, setError] = useState(null);

    const fetchMembers = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/`, {
                headers: {
                    Authorization: `Bearer ${API_KEY}`, // ✅ Secure API Key
                },
            });
            setMembers(response.data);
        } catch (error) {
            setError("Failed to fetch members. Please try again.");
            console.error("Error fetching members:", error);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    return (
        <div>
            <h1>Members</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <ul>
                {members.map((member) => (
                    <li key={member.mem_id}>{member.mem_name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Members;
