const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const path = require('path');
const app = express();

// Serve static files (CSS, JS, images) from 'fee2' directory
app.use(express.static(path.join(__dirname, )));

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());  // For handling JSON form submissions

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'SINGH',
    database: 'user_data'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Database.');
});

// Route to serve the home page (index.html)
app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname,  'index.html'));  // Make sure 'index.html' exists in 'fee2'
});

// Route to serve the signup page
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname,  'signup.html'));  // Ensure 'signup.html' exists in 'fee2'
});

// POST route to handle signup form submission
// POST route to handle signup form submission
app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(sql, [username, email, hashedPassword], (err, result) => {
        if (err) {
            console.log(err);
            return res.json({ success: false, message: 'Error registering user.' });
        }
        res.json({ success: true, message: 'User registered successfully.' });
    });
});






// Route to serve the login page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname,  'login.html'));  // Ensure 'login.html' exists in 'fee2'
});

// POST route to handle login form submission
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Please provide both username and password' });
    }

    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [username], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error logging in.');
        }

        if (results.length > 0) {
            const user = results[0];

            if (bcrypt.compareSync(password, user.password)) {
                return res.json({ success: true, message: `Welcome, ${user.username}` });
            } else {
                return res.json({ success: false, message: 'Incorrect password. Please try again.' });
            }
        } else {
            return res.json({ success: false, message: 'User not found. Please register.' });
        }
    });
});

// Add other routes to serve different pages of your website (if you have multiple pages)
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname,  'about.html'));  // Example route for 'about.html'
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname,  'contact.html'));  // Example route for 'contact.html'
});
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname,  'how-it-works.html'));  // Example route for 'contact.html'
});
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname,  'tutorial.html'));  // Example route for 'contact.html'
});

// Add more routes for other HTML pages as needed...

// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
