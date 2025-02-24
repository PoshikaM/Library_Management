const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Insert Members
  await prisma.member.createMany({
    data: [
      { mem_name: 'Alice Johnson', mem_phone: '1234567890', mem_email: 'alice@example.com' },
      { mem_name: 'Bob Smith', mem_phone: '9876543210', mem_email: 'bob@example.com' },
      { mem_name: 'Charlie Brown', mem_phone: '1122334455', mem_email: 'charlie@example.com' },
      { mem_name: 'David Williams', mem_phone: '2233445566', mem_email: 'david@example.com' },
      { mem_name: 'Eve Davis', mem_phone: '3344556677', mem_email: 'eve@example.com' },
    ],
  });

  // Insert Memberships
  await prisma.membership.createMany({
    data: [
      { member_id: 1, status: 'Active' },
      { member_id: 2, status: 'Inactive' },
      { member_id: 3, status: 'Active' },
      { member_id: 4, status: 'Pending' },
      { member_id: 5, status: 'Active' },
    ],
  });

  // Insert Collections
  await prisma.collection.createMany({
    data: [
      { collection_name: 'Fiction' },
      { collection_name: 'Science' },
      { collection_name: 'History' },
      { collection_name: 'Biography' },
      { collection_name: 'Philosophy' },
    ],
  });

  // Insert Categories
  await prisma.category.createMany({
    data: [
      { cat_name: 'Novel', sub_cat_name: 'Mystery' },
      { cat_name: 'Physics', sub_cat_name: 'Quantum Mechanics' },
      { cat_name: 'World History', sub_cat_name: 'Ancient' },
      { cat_name: 'Autobiography', sub_cat_name: 'Personal Life' },
      { cat_name: 'Ethics', sub_cat_name: 'Moral Philosophy' },
    ],
  });

  // Insert Books
  await prisma.book.createMany({
    data: [
      { book_name: 'The Silent Patient', book_cat_id: 1, book_collection_id: 1, book_launch_date: new Date('2019-02-05'), book_publisher: 'Celadon Books' },
      { book_name: 'A Brief History of Time', book_cat_id: 2, book_collection_id: 2, book_launch_date: new Date('1988-04-01'), book_publisher: 'Bantam Books' },
      { book_name: 'Sapiens', book_cat_id: 3, book_collection_id: 3, book_launch_date: new Date('2011-09-04'), book_publisher: 'Harper' },
      { book_name: 'The Diary of a Young Girl', book_cat_id: 4, book_collection_id: 4, book_launch_date: new Date('1947-06-25'), book_publisher: 'Contact Publishing' },
      { book_name: 'The Republic', book_cat_id: 5, book_collection_id: 5, book_launch_date: new Date('-0380-01-01'), book_publisher: 'Ancient Greece' },
    ],
  });

  // Insert Issuances
  await prisma.issuance.createMany({
    data: [
      { book_id: 1, issuance_member_id: 1, issuance_date: new Date('2024-02-01'), issued_by: 'Admin', target_return_date: new Date('2024-02-15'), issuance_status: 'Issued' },
      { book_id: 2, issuance_member_id: 2, issuance_date: new Date('2024-02-05'), issued_by: 'Librarian', target_return_date: new Date('2024-02-20'), issuance_status: 'Returned' },
      { book_id: 3, issuance_member_id: 3, issuance_date: new Date('2024-02-10'), issued_by: 'Admin', target_return_date: new Date('2024-02-25'), issuance_status: 'Issued' },
      { book_id: 4, issuance_member_id: 4, issuance_date: new Date('2024-02-15'), issued_by: 'Librarian', target_return_date: new Date('2024-03-01'), issuance_status: 'Lost' },
      { book_id: 5, issuance_member_id: 5, issuance_date: new Date('2024-02-20'), issued_by: 'Admin', target_return_date: new Date('2024-03-05'), issuance_status: 'Issued' },
    ],
  });

  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });