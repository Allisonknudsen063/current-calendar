// track.js
const express = require('express');
const pool = require('../db');

// Create an instance of the express router
const router = express.Router();

// Define the POST endpoint for tracking menstruation
router.post('/', (req, res) => {
    // Extract the date and action from the request body
    const { date, action } = req.body;
    
    // Retrieve the user's ID from the session
    const userId = req.session.userId;

    // Determine if it's the first or last day of menstruation based on the action
    const isFirstDay = action === 'start';
    const isLastDay = action === 'stop';

    // Insert the date into the database along with the user's ID
    pool.query('INSERT INTO trackeddates (date, isFirstDay, isLastDay, userId) VALUES (?, ?, ?, ?)', 
               [date, isFirstDay, isLastDay, userId], 
               (error, results) => {
        if (error) {
            console.error('Error inserting date:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        // Send a response indicating successful tracking
        res.status(200).json({ message: 'Menstruation tracked successfully', date });
    });
});
// GET endpoint to retrieve tracked days
router.get('/', (req, res) => {
    // Retrieve the user's ID from the session
    const userId = req.session.userId;

    // Query the database to retrieve tracked days for the user
    pool.query('SELECT date FROM trackeddates WHERE userId = ?', [userId], (error, results) => {
        if (error) {
            console.error('Error retrieving tracked days:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        // Send the retrieved tracked days as a response
        res.status(200).json(results);
    });
});

// Export the router
module.exports = router;
