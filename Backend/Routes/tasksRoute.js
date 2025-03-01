const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

// Get all books that have never been borrowed
router.get('/never-borrowed-books', async (req, res) => {
  try {
    const books = await prisma.book.findMany({
      where: {
        book_id: {
          notIn: (await prisma.issuance.findMany({ select: { book_id: true } })).map(i => i.book_id),
        },
      },
      select: {
        book_name: true,
        book_publisher: true, // Assuming publisher is the author info in your schema
      },
    });

    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get("/outstanding-books", async (req, res) => {
  try {
    const outstandingBooks = await prisma.issuance.findMany({
      where: {
        issuance_status: "Issued"
      },
      select: {
        issuance_member: {
          select: {
            mem_name: true // Ensure this is the correct field
          }
        },
        book: {
          select: {
            book_name: true,
            book_publisher: true // Use the correct field name for author
          }
        },
        issuance_date: true,
        target_return_date: true
      }
    });

    // Formatting response properly
    const formattedResponse = outstandingBooks.map((issue) => ({
      member_name: issue.issuance_member?.mem_name || "Unknown",
      book_name: issue.book?.book_name || "Unknown",
      author: issue.book?.book_publisher || "Unknown", // Adjust field name
      issuance_date: issue.issuance_date,
      target_return_date: issue.target_return_date
    }));

    res.json(formattedResponse);
  } catch (error) {
    console.error("Error fetching outstanding books:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/top-borrowed-books", async (req, res) => {
  try {
    const topBorrowedBooks = await prisma.issuance.groupBy({
      by: ["book_id"],
      _count: {
        book_id: true,
        issuance_member_id: true,
      },
      orderBy: {
        _count: {
          book_id: "desc",
        },
      },
      take: 3,
    });

    const booksWithDetails = await Promise.all(
      topBorrowedBooks.map(async (book) => {
        const bookDetails = await prisma.book.findUnique({
          where: { book_id: book.book_id },
          select: { book_name: true },
        });

        return {
          book_name: bookDetails?.book_name || "Unknown",
          times_borrowed: book._count.book_id,
          unique_members: book._count.issuance_member_id,
        };
      })
    );

    res.json(booksWithDetails);
  } catch (error) {
    console.error("Error fetching top borrowed books:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = router;