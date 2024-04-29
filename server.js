// server.js 

// Port for the site
const port = 3000; 

// Page routes
const authRouter = require('./auth');
const bodyParser = require('body-parser');
const dashboardRouter = require('./dashboard')

// API routes
const trackRouter = require('./api/track'); 
//const eventsRouter = require('./api/events'); //commented out until there is functionality

// Database pool
const pool = require('./db')

// Express app
const express = require('express');
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Express-session will hold session data while the user is logged in
const session = require('express-session');

// Use session middleware
app.use(session({
    secret: 'b984a88dc91fb9612c889008921b34664ec29caf43abd181f9f9d1327b5def95', // Random 32-bit secret key
    resave: false,
    saveUninitialized: true
}));

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

// Parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Mount the auth routes under '/auth'
app.use('/auth', authRouter);

// Mount the dashboard routes under '/dashboard'
app.use('/dashboard', dashboardRouter);

// Mount the track router under the '/api' path
app.use('/api/track', trackRouter);

//Mount the events router under the '/api/ path
//app.use('/api/events', eventsRouter) //commented out until there is functionality

// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}/auth/login`);
});
