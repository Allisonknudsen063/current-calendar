// track.js
const express = require('express');
const pool = require('../db');

// Create an instance of the express router
const router = express.Router();

router.get('/days', (req, res) => {
    // Retrieve the user's ID from the session
    const userId = req.session.userId;

    // Query the database to retrieve tracked days for the user
    pool.query('SELECT startDate, endDate FROM trackeddates WHERE userId = ?', [userId], (error, results) => {
        if (error) {
            console.error('Error retrieving tracked days:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        // Send the retrieved tracked days as a response
        res.status(200).json(results);
    });
});



router.post('/start', (req, res) => {
    // Extract the start date from the request body
    const { date } = req.body;

    // Retrieve the user's ID from the session
    const userId = req.session.userId;

    // Insert the start date into the database along with the user's ID
    pool.query('INSERT INTO trackeddates (startDate, userID) VALUES (?, ?)', [date, userId], (error, results) => {
        if (error) {
            console.error('Error inserting start date:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        // Send a response indicating successful start of tracking
        res.status(200).json({ message: 'Start date tracked successfully', date });
    });
});

router.post('/stop', (req, res) => {
    // Extract the end date from the request body
    const { date } = req.body;

    // Retrieve the user's ID from the session
    const userId = req.session.userId;

    // Update the end date in the database for the most recent tracked period
    pool.query(
        'UPDATE trackeddates SET endDate = ? WHERE userID = ? AND endDate IS NULL ORDER BY startDate DESC LIMIT 1',
        [date, userId],
        (error, results) => {
            if (error) {
                console.error('Error updating end date:', error);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            // Send a response indicating successful stop of tracking
            res.status(200).json({ message: 'End date tracked successfully', date });
        }
    );
});



// Export the router
module.exports = router;
