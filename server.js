const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const path = require('path');
const app = express();


// Serve static files (like CSS, images, etc.)
app.use(express.static('public'));

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Kipscse@120306',
    database: 'user_data'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Database.');
});

// GET route to serve signup page
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'signup.html')); // Make sure signup.html exists in the same folder
});

// POST route to handle form submission (signing up)
app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;

    // Hash the password before storing it in the database
    const hashedPassword = bcrypt.hashSync(password, 10);

    const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(sql, [username, email, hashedPassword], (err, result) => {
        if (err) {
            console.log(err);
            return res.send('Error registering user.');
        }
        res.send('User registered successfully.');
    });
});

app.use(express.json()); // Add this line
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const db1 = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Kipscse@120306',
    database: 'user_data'
});


// GET route to serve login page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html')); // Make sure login.html exists in the same folder
});


// POST route to handle login requests
// POST route to handle login requests
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // SQL query to find the user by username
    const sql = 'SELECT * FROM users WHERE username = ?';
    db1.query(sql, [username], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error logging in.');
        }

        console.log(results); // This will show the result of the query
        if (results.length > 0) {
            const user = results[0];
            // Compare the password with the hashed password
            if (bcrypt.compareSync(password, user.password)) {
                // Successful login
                return res.json({ success: true, message: `Welcome, ${user.username}` });
            } else {
                // Incorrect password
                return res.json({ success: false, message: 'Incorrect password. Please try again.' });
            }
        } else {
            // User not found
            return res.json({ success: false, message: 'User not found. Please register.' });
            console.log(results); // This will show the result of the query
        }
    });
});



// Start the server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
