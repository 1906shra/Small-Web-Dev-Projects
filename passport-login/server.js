import exp from 'constants';
import express from 'express';
import path from 'path';


const user = []
const app = express();
app.use(express.urlencoded({extended:false}))
const __dirname = path.resolve(); // Get the current directory

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'src')));

// Route to serve login.html
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'login.html'));
});

// Handle login POST request
app.post('/login', (req, res) => {
    // Add your login logic here
    res.send('Login request received');

    req..body.email
});

// Route to serve register.html
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'register.html'));
});

// Handle register POST request
app.post('/register', (req, res) => {
    // Add your register logic here
    res.send('Register request received');
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
