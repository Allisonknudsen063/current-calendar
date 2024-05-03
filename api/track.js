// track.js
const express = require('express');
const pool = require('../db');

// Create an instance of the express router
const router = express.Router();

// Define the POST endpoint for tracking menstruation
router.post('/', (req, res) => {
    // Extract the start date, end date, and action from the request body
    const { startDate, endDate } = req.body;
    
    // Retrieve the user's ID from the session
    const userId = req.session.userId;

    // Insert the period into the database along with the user's ID
    pool.query('INSERT INTO trackeddates (startDate, endDate, userID) VALUES (?, ?, ?)', 
               [startDate, endDate, userId], 
               (error, results) => {
        if (error) {
            console.error('Error inserting period:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        // Send a response indicating successful tracking
        res.status(200).json({ message: 'Menstruation tracked successfully', startDate, endDate });
    });
});

// GET endpoint to retrieve tracked periods
router.get('/', (req, res) => {
    // Retrieve the user's ID from the session
    const userId = req.session.userId;

    // Query the database to retrieve tracked periods for the user
    pool.query('SELECT startDate, endDate FROM trackeddates WHERE userID = ?', [userId], (error, results) => {
        if (error) {
            console.error('Error retrieving tracked periods:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        // Send the retrieved tracked periods as a response
        res.status(200).json(results);
    });
});

// Export the router
module.exports = router;
