Library Management System

Overview

This project is a simplified Library Management System that includes a database model and a set of CRUD RESTful APIs for managing books, members, and book issuance records. Additionally, a dashboard UI is provided to track books pending for return on a given day.

Features

Database Model: Hosted on a chosen database.

CRUD RESTful APIs: Implemented for Member, Book, and Issuance entities.

Security: APIs include a security mechanism to prevent unauthorized access (e.g., API keys).

Standard API Naming: API endpoints follow a structured format.

Dashboard UI: Displays members with books pending for return.

Sample Data: Pre-loaded data for testing.

Database Model

The entity-relationship model for the system is available at: Library Management System Model

API Endpoints

Member API

GET /member/{id} - Fetch details of a specific member.

POST /member - Add a new member.

PUT /member/{id} - Update an existing member.

Book API

GET /book/{id} - Fetch details of a specific book.

POST /book - Add a new book.

PUT /book/{id} - Update an existing book.

Issuance API

GET /issuance/{id} - Fetch details of a specific issuance.

POST /issuance - Issue a book to a member.

PUT /issuance/{id} - Update issuance details.

Security Mechanism

API requests require an API key for authorization.

Unauthorized requests are blocked.

Dashboard UI

A simple frontend displays members with books due for return on a given day.

Technologies Used

Backend: Node.js/Express (or Python Flask/Django)

Database: PostgreSQL/MySQL/MongoDB

Frontend: React.js/Vue.js

Authentication: API Keys

Setup Instructions

Clone the repository.

Configure the database connection.

Run database migrations to set up tables.

Start the backend server.

Launch the frontend dashboard.

Future Enhancements

Implement soft delete for entities instead of hard deletion.

Add role-based access control.

Implement email notifications for due book returns.

Author

Developed as part of a Library Management System project.

Solution for Task 2 is in Backend in prisma folder library_queries.sql file.