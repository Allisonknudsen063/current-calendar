//authMiddleware.js

//middleware function to confirm a user has been authenticated

function isAuthenticated(req, res, next) {
    if (req.session.loggedIn) {
        // User is authenticated, proceed to the next middleware
        next();
    } else {
        // User is not authenticated, send an error response
        res.status(401).json({ error: 'Unauthorized' });
    }
}

module.exports = isAuthenticated;
