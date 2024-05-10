const express = require('express');
const router = express.Router(); // Create a router instance
const isAuthenticated = require('./authMiddleware'); // Import the isAuthenticated function
const { predictNextPeriod } = require('./prediction'); // Import the predictNextPeriod function
const pool = require('./db'); // Import the database pool

// Route to serve the sign-in form
router.get('/login', (req, res) => {
  res.render('login'); // Assuming 'login.ejs' is in your views directory
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
      if (password !== user.password) { 
        return res.status(401).send('Invalid username or password');
      }
      
      // User is authenticated
      req.session.loggedIn = true; // Set loggedIn to true to indicate user is authenticated
      req.session.username = user.username; // Store the username in the session
      req.session.userId = user.userId; // Store the userId in the session
      req.session.firstname = user.firstname;//store the user's firstname 
      
      // Predict the next period start date
      predictNextPeriod(req.session.userId)
          .then(predictedStartDate => {
              // Check if there's already a predicted period for the user
              pool.query('SELECT * FROM predictedperiods WHERE userId = ?', [req.session.userId], (error, results) => {
                  if (error) {
                      console.error('Error checking existing predicted period:', error);
                  } else {
                      if (results.length > 0) {
                          // Update the existing predicted period
                          pool.query('UPDATE predictedperiods SET startDate = ? WHERE userId = ?', [predictedStartDate, req.session.userId], (updateError, updateResults) => {
                              if (updateError) {
                                  console.error('Error updating predicted period:', updateError);
                              } else {
                                  console.log('Predicted period updated successfully');
                              }
                          });
                      } else {
                          // Insert the new predicted period
                          pool.query('INSERT INTO predictedperiods (userId, startDate) VALUES (?, ?)', [req.session.userId, predictedStartDate], (insertError, insertResults) => {
                              if (insertError) {
                                  console.error('Error inserting predicted period:', insertError);
                              } else {
                                  console.log('Predicted period inserted successfully');
                              }
                          });
                      }
                  }
              });
          })
          .catch(predictionError => {
              console.error('Error predicting next period:', predictionError);
          });

      res.redirect('/dashboard'); // Redirect the user to the dashboard or any other page
    });

});

module.exports = router;
