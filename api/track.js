// track.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// Define the POST endpoint for tracking menstruation
router.post('/api/track', (req, res) => {
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

module.exports = router;
