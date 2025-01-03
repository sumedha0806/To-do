import express from 'express';
import bcrypt from 'bcrypt';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();


const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const app = express();
const PORT = 3000;

app.use(express.json());
// Test GET endpoint
app.get('/test', (req, res) => {
    console.log('GET request received at /test - Successful');
    res.status(200).send('GET request successful - Server is working!');
});

// Register User
// Register User
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    console.log('Request body:', req.body); // Log incoming request
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Hashed password:', hashedPassword); // Log hashed password
        const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
        const [result] = await db.execute(query, [username, hashedPassword]);
        res.status(201).send('User registered successfully.');
    } catch (err) {
        console.error('Error during registration:', err); // Log detailed error
        res.status(500).send('Error registering user.');
    }
});



// User Login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username = ?';

    try {
        const [rows] = await db.query(query, [username]);
        if (rows.length === 0) {
            return res.status(404).send('User not found.');
        }
        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send('Invalid credentials.');
        }
        res.send('Login successful!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error logging in.');
    }
});

// Submit Review
app.post('/submit-review', async (req, res) => {
    const { userId, review } = req.body;
    const query = 'INSERT INTO reviews (user_id, review) VALUES (?, ?)';

    try {
        await db.query(query, [userId, review]);
        res.status(201).send('Review submitted successfully.');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error submitting review.');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
