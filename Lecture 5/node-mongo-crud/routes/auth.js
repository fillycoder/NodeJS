const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');

// Login Page
router.get('/login', (req, res) => res.render('login'));

// Register Page
router.get('/signup', (req, res) => res.render('signup'));

// Register Handler
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = new User({ username, password });
        await user.save();
        res.redirect('/login');
    } catch (error) {
        res.status(500).send("Error registering new user please try again.");
    }
});

// Login Handler
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user && await bcrypt.compare(password, user.password)) {
            req.session.userId = user._id;
            res.redirect('/dashboard');
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

// Dashboard Page
router.get('/dashboard', (req, res) => {
    if (!req.session.userId) {
        return res.status(401).send('Login required');
    }
    res.render('dashboard');
});

module.exports = router;
