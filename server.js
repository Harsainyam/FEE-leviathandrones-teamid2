const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const path = require('path');
const app = express();

// Serve static files (CSS, JS, images) from root directory
app.use(express.static(path.join(__dirname)));

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

// Serve HTML files for specific routes
app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'signup.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'about.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'contact.html'));
});

app.get('/how-it-works', (req, res) => {
    res.sendFile(path.join(__dirname, 'how-it-works.html'));
});

app.get('/tutorial', (req, res) => {
    res.sendFile(path.join(__dirname, 'tutorial.html'));
});

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

// Serve the React app for any route prefixed with /app
app.use('/app', express.static(path.join(__dirname, 'leviathan-drones-react/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'leviathan-drones-react', 'build', 'index.html'));
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
