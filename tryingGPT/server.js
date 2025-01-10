const express = require('express');
const { Pool } = require('pg');
const cors = require('cors'); // Optional: For cross-origin resource sharing
const path = require('path');

const app = express();
const PORT = 3000;

// Database Connection
const pool = new Pool({
    user: 'postgres',        // Replace with your PostgreSQL username
    host: 'localhost',       // Host where PostgreSQL is running
    database: 'medical_office', // Replace with your database name
    password: 'yassine124800', // Replace with your PostgreSQL password
    port: 5432,              // Default PostgreSQL port
});

// Middleware
app.use(cors());                      // Optional: Enables CORS for frontend-backend communication
app.use(express.json());              // Parse incoming JSON requests
app.use(express.static(path.join(__dirname, 'public'))); // Serve frontend files from the "public" folder

// Routes

// Get all clients
app.get('/api/clients', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM clients ORDER BY id');
        res.json(result.rows); 
    } catch (error) {
        console.error('Error fetching clients:', error);
        res.status(500).json({ error: 'Error fetching clients' });
    }
});

// Add a new client
app.post('/api/clients', async (req, res) => {
    const { name, email, phone } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO clients (name, email, phone) VALUES ($1, $2, $3) RETURNING *',
            [name, email, phone]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error adding client:', error);
        res.status(500).json({ error: 'Error adding client' });
    }
});

// Update a client
app.put('/api/clients/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }

    try {
        const result = await pool.query(
            'UPDATE clients SET name = $1, email = $2, phone = $3 WHERE id = $4 RETURNING *',
            [name, email, phone, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Client not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating client:', error);
        res.status(500).json({ error: 'Error updating client' });
    }
});

// Delete a client
app.delete('/api/clients/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('DELETE FROM clients WHERE id = $1', [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Client not found' });
        }

        res.status(204).send(); // No content
    } catch (error) {
        console.error('Error deleting client:', error);
        res.status(500).json({ error: 'Error deleting client' });
    }
});

// Catch-all for invalid routes
app.use((req, res) => {
    res.status(404).send('Endpoint not found');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
