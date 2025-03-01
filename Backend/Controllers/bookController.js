const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

// Creating Book (POST)
const createBook = async (req, res) => {
    try{
        const { book_name, book_cat_id, book_collection_id, book_launch_date, book_publisher } = req.body;

        if( !book_name || !book_cat_id || !book_collection_id || !book_launch_date || !book_publisher ){
            return res.status(400).json({ error : "All fields are required" });
        }

        const newBook = await prisma.book.create({
            data : {
                book_name, 
                book_cat_id, 
                book_collection_id, 
                book_launch_date : new Date(book_launch_date), 
                book_publisher
            }
        });
        return res.status(201).json({ message : "Book created successfully", book : newBook });

    } catch(error){
        console.log("Error adding book: ", error);

        if(error.code === "P2002"){
            return res.status(409).json({ error : "Book already exists" });
        }
        return res.status(500).json({ error : "Internal Server Error" });
    }
}

// Retrieve all books (GET)
const getAllBooks = async (req, res) => {
    try{
        const books = await prisma.book.findMany();
        return res.status(200).json(books);
    } catch(error){
        console.log("Error fetching books:", error);
        return res.status(500).json({ error : "Internal Server Error" });
    }
}

// Retrieve book by id (GET)
const getBookById = async (req, res) => {
    try{
        const { id } = req.params;
        const book = await prisma.book.findUnique({ where  : { book_id : Number(id) }});

        if(!book){
            return res.status(404).json({ error: "Book not found" });
        }

        return res.status(200).json(book);
    } catch(error){
        console.error("Error fetching book:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

// Update book details (PUT)
const updateBook = async (req, res) => {
    try{
        const { id } = req.params;
        const { book_name, book_cat_id, book_collection_id, book_launch_date, book_publisher } = req.body;

        if (!book_name || !book_cat_id || !book_collection_id || !book_launch_date || !book_publisher) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const updatedBook = await prisma.book.update({
            where: { book_id: Number(id) },
            data: {
                book_name,
                book_cat_id,
                book_collection_id,
                book_launch_date: new Date(book_launch_date),
                book_publisher,
            },
        });

        return res.status(200).json({ message: "Book updated successfully!", book: updatedBook });
    } catch(error){
        console.error("Error updating book:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

// Delete book (DELETE)
const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;

        const book = await prisma.book.findUnique({ where: { book_id: Number(id) } });

        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }

        await prisma.book.delete({ where: { book_id: Number(id) } });

        return res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        console.error("Error deleting book:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { createBook, getAllBooks, getBookById, updateBook, deleteBook }