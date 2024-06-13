const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const flash = require('connect-flash');
const User = require('./models/user');
require('dotenv').config();
require('./config/passport')(passport);

const app = express();

// MongoDB Connection
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

// Session Configuration
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash
app.use(flash());

// Set view engine to EJS
app.set('view engine', 'ejs');

// Serve static files from 'public' directory
app.use(express.static('public'));

// Middleware to parse request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Global variables for flash messages
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// Google OAuth routes
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect('/dashboard');
    });

// Basic routes
app.get('/', (req, res) => res.render('login'));

app.get('/login', (req, res) => {
    res.render('login', { message: req.flash('error_msg') });
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user && await bcrypt.compare(password, user.password)) {
            req.login(user, (err) => {
                if (err) throw err;
                req.flash('success_msg', 'You are now logged in.');
                res.redirect('/dashboard');
            });
        } else {
            req.flash('error_msg', 'Invalid username or password.');
            res.redirect('/login');
        }
    } catch (error) {
        console.error(error);
        req.flash('error_msg', 'An error occurred. Please try again.');
        res.redirect('/login');
    }
});

app.get('/signup', (req, res) => res.render('signup'));

app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            req.flash('error_msg', 'Username already exists. Choose a different username.');
            return res.redirect('/signup');
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        req.flash('success_msg', 'User created successfully! Please log in.');
        res.redirect('/login');
    } catch (error) {
        if (error.code === 11000) {
            req.flash('error_msg', 'Username already exists. Please choose a different username.');
            res.redirect('/signup');
        } else {
            console.error(error);
            req.flash('error_msg', 'An error occurred during the registration process.');
            res.redirect('/signup');
        }
    }    
});

app.get('/logout', (req, res) => {
    req.logout(err => {
        if (err) return next(err);
        req.flash('success_msg', 'You are logged out');
        res.redirect('/login');
    });
});

app.get('/dashboard', (req, res) => {
    if (req.isAuthenticated()) {
        res.render('dashboard', { user: req.user });
    } else {
        req.flash('error_msg', 'Please log in to view that resource');
        res.redirect('/login');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
