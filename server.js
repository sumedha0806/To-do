const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Database connection
const dbPath = path.resolve(__dirname, 'database.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
    }
});

// Route to register a new user
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const query = `INSERT INTO users (username, password) VALUES (?, ?)`;

    db.run(query, [username, password], function (err) {
        if (err) {
            console.error(err.message);
            res.status(500).send('Error registering user.');
        } else {
            res.status(201).send('User registered successfully.');
        }
    });
});

// Route to submit a review
app.post('/submit-review', (req, res) => {
    const { userId, review } = req.body;
    const query = `INSERT INTO reviews (user_id, review) VALUES (?, ?)`;

    db.run(query, [userId, review], function (err) {
        if (err) {
            console.error(err.message);
            res.status(500).send('Error submitting review.');
        } else {
            res.status(201).send('Review submitted successfully.');
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
