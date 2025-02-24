const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

// Create issuance (POST)
const createIssuance = async (req, res) => {
    try {
        const { book_id, issuance_member_id, issuance_date, issued_by, target_return_date, issuance_status } = req.body;

        if (!book_id || !issuance_member_id || !issuance_date || !issued_by || !target_return_date || !issuance_status) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const newIssuance = await prisma.issuance.create({
            data: {
                book_id,
                issuance_member_id,
                issuance_date: new Date(issuance_date),
                issued_by,
                target_return_date: new Date(target_return_date),
                issuance_status
            }
            });
        res.status(201).json(newIssuance);
    } catch(error){
        console.log("Error creating issuance: ", error);
        res.status(500).json({ error: 'Failed to create issuance' });
    }
}

// Retrieve all issuance (GET)
const getIssuance = async (req, res) => {
    try {
        const issuances = await prisma.issuance.findMany({
          include: {
            book: true,
            issuance_member: true
          }
        });
        res.status(200).json(issuances);
    } catch(error){
            console.log("Error retrieving issuance: ", error);
            res.status(500).json({ error: 'Failed to fetch issuances' });
    }
}

// Retrieve issuance by id (GET)
const getIssuanceById = async (req, res) => {
    try {
        const issuance = await prisma.issuance.findUnique({ where: { issuance_id: Number(req.params.id) },
            include: {
            book: true,
            issuance_member: true
        }
        });

        if(!issuance){
            return res.status(404).json({ error: 'Issuance not found' });
        };

        res.status(200).json(issuance);
    } catch (error) {
        console.log("Error retrieving issuance: ", error);
        res.status(500).json({ error: 'Failed to fetch issuance' });
    }
}

// Update issuance (PUT)
const updateIssuance = async (req, res) => {
    try {
        const { book_id, issuance_member_id, issuance_date, issued_by, target_return_date, issuance_status } = req.body;

        if (!book_id || !issuance_member_id || !issuance_date || !issued_by || !target_return_date || !issuance_status) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const updatedIssuance = await prisma.issuance.update({
            where: { issuance_id: Number(req.params.id) },
            data: {
                book_id,
                issuance_member_id,
                issuance_date: new Date(issuance_date),
                issued_by,
                target_return_date: new Date(target_return_date),
                issuance_status
            }
            });
            res.status(200).json(updatedIssuance);
    } catch(error){
        console.log("Error updating issuance: ", error);
        res.status(500).json({ error: 'Failed to update issuance' });
    }
}

module.exports = { createIssuance, getIssuance, getIssuanceById, updateIssuance }