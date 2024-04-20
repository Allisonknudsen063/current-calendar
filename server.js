//server.js 
//(set up nodejs server)
const express = require('express');
const authRouter = require('./auth');
const pool = require('./db')
const app = express();
const port = 3000; // Choose any available port


// Define a route to fetch data from the database
app.get('/data', (req, res) => {
    pool.query('SELECT * FROM users', (error, results, fields) => {
      if (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      } else {
        res.json(results);
      }
    });
  });

app.use('/auth', authRouter); // Mount the auth routes under '/auth'

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

