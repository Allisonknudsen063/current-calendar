const express = require('express');
const router = express.Router();

// Middleware function to check if the user is authenticated
function isAuthenticated(req, res, next) {
    if (req.session.loggedIn) {
        // User is authenticated, proceed to the next middleware
        next();
    } else {
        // User is not authenticated, redirect to the login page
        res.redirect('/auth/login');
    }
}

// Dashboard route accessible only to authenticated users
router.get('/', isAuthenticated, (req, res) => {
    // Render the dashboard.ejs view with user-specific information
    const username = req.session.username;
    res.render('dashboard', { username: username });
});

module.exports = router;
