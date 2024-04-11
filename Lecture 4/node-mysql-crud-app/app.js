const bodyParser = require('body-parser');
const mysql = require('mysql');
const express = require('express');
const app = express();
const ejs = require('ejs');
const port = 3000;

// Set the view engine to ejs
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'example'
});

connection.connect(err => {
  if (err) throw err;
  console.log('Connected to the MySQL server.');
});

app.get('/', (req, res) => {
    res.render('home');
});

// CRUD operations routes here...
app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    connection.query(sql, (error, results) => {
        if (error) {
            console.error('Error fetching users:', error);
            res.status(500).send('Error fetching users');
            return;
        }
        res.render('users', { users: results });
    });
});

app.post('/users', (req, res) => {
    const { name, age } = req.body;
    const sql = 'INSERT INTO users (name, age) VALUES (?, ?)';
    connection.query(sql, [name, age], (error, results) => {
        if (error) {
            res.status(500).send('Error adding user');
            console.error(error);
        } else {
            // Redirect back to the home page which now updates the list dynamically
            res.redirect('/');
        }
    });
});


app.get('/select-operation', (req, res) => {
    res.render('select-crud');
});

// List users with an option to edit
app.get('/users/edit', (req, res) => {
    connection.query('SELECT * FROM users', (error, results) => {
        if (error) {
            console.error('Error fetching users:', error);
            res.status(500).send('Error fetching users');
            return;
        }
        res.render('edit-list', { users: results }); // Ensure you have an 'edit-list.ejs' view
    });
});

app.get('/users/edit/:id', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM users WHERE id = ?', [id], (error, results, fields) => {
    if (error) {
      res.status(500).send('Error fetching user');
      console.error(error);
    } else {
      if (results.length > 0) {
        res.render('edit-user', { user: results[0] });
      } else {
        res.status(404).send('User not found');
      }
    }
  });
});
  
// For adding a user
// Route to display form to add a new user
app.get('/users/new', (req, res) => {
    res.render('add-user');
});


  
app.post('/users/update/:id', (req, res) => {
    const { name, age } = req.body;
    const { id } = req.params;
    connection.query('UPDATE users SET name = ?, age = ? WHERE id = ?', [name, age, id], (error, results) => {
      if (error) {
        res.status(500).send('Error updating user');
        console.error(error);
      } else {
        res.redirect('/users');
      }
    });
  });
  
  // List users with an option to delete
app.get('/users/delete', (req, res) => {
    connection.query('SELECT * FROM users', (error, results) => {
        if (error) {
            console.error('Error fetching users:', error);
            res.status(500).send('Error fetching users');
            return;
        }
        res.render('delete-list', { users: results }); // Ensure you have a 'delete-list.ejs' view
    });
});


  app.get('/users/delete/:id', (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM users WHERE id = ?', [id], (error, results) => {
      if (error) {
        res.status(500).send('Error deleting user');
        console.error(error);
      } else {
        res.redirect('/users');
      }
    });
  });
  

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
  

