const express = require('express');
const app = express();
const port = 8000;

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.render('home', { title: 'Home' });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About Us' });
});

app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact Us' });
});

app.get('/hiring', (req, res) => {
    res.render('hiring', { title: 'Hiring' });
});

app.get('/training', (req, res) => {
    res.render('training', { title: 'Training' });
});

app.get('/bootcamp', (req, res) => {
    res.render('bootcamp', { title: 'Bootcamp' });
});

// Start the server
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
