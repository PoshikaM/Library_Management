const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

// Create Member (POST)
const createMember = async (req, res) => {
    try{
        const { mem_name, mem_phone, mem_email } = req.body;

        if (!mem_name || !mem_phone || !mem_email) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const newMember = await prisma.member.create({
            data: {
                mem_name,
                mem_phone,
                mem_email
            }
        });

        res.status(201).json({ message : "Member created successfully", member : newMember });
    } catch(error){
        console.log("Error creating member: ", error);
        return res.status(500).json({ error : "Internal Server Error" });
    }
}

// Retreive all members (GET)
const getAllMembers = async (req, res) => {
    try {
        const members = await prisma.member.findMany();
        res.status(200).json(members);
    } catch (error) {
        console.error("Error fetching members:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// Retrieve member by id (GET)
const getMemberById = async (req, res) => {
    try{
        const { id } = req.params;
        const member = await prisma.member.findUnique({ where: { mem_id: Number(id) }});

        if (!member) {
            return res.status(404).json({ error: "Member not found" });
        }

        res.status(200).json(member); 
    } catch(error){
        console.error("Error fetching detail of member :", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

// Update member detail (PUT)
const updateMember = async (req, res) => {
    try{
        const { id } = req.params;
        const { mem_name, mem_phone, mem_email } = req.body;

        if (!mem_name || !mem_phone || !mem_email) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const updatedMember = await prisma.member.update({
            where: { mem_id: Number(id) },
            data: {
                mem_name,
                mem_phone,
                mem_email,
            },
        });

        res.status(200).json({ message: "Member updated successfully!", member: updatedMember });
    } catch(error){
        console.error("Error updating member:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

// Delete member (DELETE)
const deleteMember = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedMember = await prisma.member.delete({
            where: { mem_id: Number(id) },
        });

        res.status(200).json({ message: "Member deleted successfully!", member: deletedMember });
    } catch (error) {
        console.error("Error deleting member:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


module.exports = { createMember, getAllMembers, getMemberById, updateMember, deleteMember }