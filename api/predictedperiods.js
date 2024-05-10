//predictedperiods.js
const express = require('express');
const pool = require('../db');
const isAuthenticated = require('../authMiddleware'); // Import the isAuthenticated function
// Create an instance of the express router
const router = express.Router();

// Function to fetch predicted periods for a given user ID
async function fetchPredictedPeriods(userId) {
    return new Promise((resolve, reject) => {
        pool.query('SELECT startDate FROM predictedperiods WHERE userId = ?', [userId], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

// Add this route to your server.js or a separate routes file
router.get('/', isAuthenticated, async (req, res) => {
    try {
        const userId = req.session.userId;
        // Fetch predicted periods for the logged-in user from the database
        const predictedPeriods = await fetchPredictedPeriods(userId);
        res.json(predictedPeriods);
    } catch (error) {
        console.error('Error fetching predicted periods:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
