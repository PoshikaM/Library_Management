function TaskDetails() {
    return (
        <div style={{ padding: "20px" }}>
            <h1>Library Management System</h1>

            <h2>Overview</h2>
            <p>
                This project is a simplified Library Management System that includes a database model and a set of CRUD RESTful APIs for managing books, members, and book issuance records. Additionally, a dashboard UI is provided to track books pending for return on a given day.
            </p>

            <h2>Features</h2>
            <ul>
                <li><strong>Database Model:</strong> Hosted on a chosen database.</li>
                <li><strong>CRUD RESTful APIs:</strong> Implemented for Member, Book, and Issuance entities.</li>
                <li><strong>Security:</strong> APIs include a security mechanism to prevent unauthorized access (e.g., API keys).</li>
                <li><strong>Standard API Naming:</strong> API endpoints follow a structured format.</li>
                <li><strong>Dashboard UI:</strong> Displays members with books pending for return.</li>
                <li><strong>Sample Data:</strong> Pre-loaded data for testing.</li>
            </ul>

            <h2>Database Model</h2>
            <p>The entity-relationship model for the system is available at: <a href="https://dbdiagram.io/d/6148c958825b5b01460afb74" target="_blank" rel="noopener noreferrer">Library Management System Model</a></p>

            <h2>API Endpoints</h2>
            
            <h3>Member API</h3>
            <ul>
                <li><code>GET /member/id</code> - Fetch details of a specific member.</li>
                <li><code>POST /member</code> - Add a new member.</li>
                <li><code>PUT /member/id</code> - Update an existing member.</li>
            </ul>

            <h3>Book API</h3>
            <ul>
                <li><code>GET /book/id</code> - Fetch details of a specific book.</li>
                <li><code>POST /book</code> - Add a new book.</li>
                <li><code>PUT /book/id</code> - Update an existing book.</li>
            </ul>

            <h3>Issuance API</h3>
            <ul>
                <li><code>GET /issuance/id</code> - Fetch details of a specific issuance.</li>
                <li><code>POST /issuance</code> - Issue a book to a member.</li>
                <li><code>PUT /issuance/id</code> - Update issuance details.</li>
            </ul>

            <h2>Security Mechanism</h2>
            <p>API requests require an API key for authorization. Unauthorized requests are blocked.</p>

            <h2>Dashboard UI</h2>
            <p>A simple frontend displays members with books due for return on a given day.</p>

            <h2>Technologies Used</h2>
            <ul>
                <li><strong>Backend:</strong> Node.js/Express (or Python Flask/Django)</li>
                <li><strong>Database:</strong> PostgreSQL/MySQL/MongoDB</li>
                <li><strong>Frontend:</strong> React.js/Vue.js</li>
                <li><strong>Authentication:</strong> API Keys</li>
            </ul>

            <h2>Setup Instructions</h2>
            <ol>
                <li>Clone the repository.</li>
                <li>Configure the database connection.</li>
                <li>Run database migrations to set up tables.</li>
                <li>Start the backend server.</li>
                <li>Launch the frontend dashboard.</li>
            </ol>

            <h2>Future Enhancements</h2>
            <ul>
                <li>Implement soft delete for entities instead of hard deletion.</li>
                <li>Add role-based access control.</li>
                <li>Implement email notifications for due book returns.</li>
            </ul>

            <h2>Author</h2>
            <p>Developed as part of a Library Management System project.</p>
        </div>
    );
}

export default TaskDetails;
