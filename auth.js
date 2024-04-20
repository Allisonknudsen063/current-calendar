//user authentication
const express = require('express');
const pool = require('./db'); // Assuming you have a separate file for your MySQL connection pool
const router = express.Router();


// Route to serve the sign-in form
router.get('/login', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    // Check if username and password are provided
    if (!username || !password) {
      return res.status(400).send('Username and password are required');
    }
  
    // Query the database to find the user by username
    pool.query('SELECT * FROM users WHERE username = ?', [username], (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
      }
  
      // Check if the user exists
      if (results.length === 0) {
        return res.status(401).send('Invalid username or password');
      }
  
      const user = results[0];
  
      // Check if the password is correct
      if (password !== user.password) { // You should use a secure method like bcrypt for password hashing and comparison
        return res.status(401).send('Invalid username or password');
      }
  
      // At this point, the user is authenticated
      req.session.userId = user.id; // Store the user's ID in the session
      res.redirect('/dashboard'); // Redirect the user to the dashboard or any other page
    });

});

module.exports = router;  
