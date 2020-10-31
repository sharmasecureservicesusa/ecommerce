const jwt = require('jsonwebtoken');

// to protect routes that require authentication
module.exports = (req, res, next) => {
    if (req.method == 'OPTIONS') {
        return next();
    }
    try {
        // console.log('[is-auth] req.headers: ', req.headers);
        const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN'
        if (!token) {
            throw new Error('Authentication failed!');
        }

        const decodedToken = jwt.verify(token, process.env.AUTH_SECRET_KEY);
        if (!decodedToken) {
            const error = new Error('Not authenticated');
            error.statusCode = 401;
            throw error;
        }

        req.userId = decodedToken.id;
        next();
    } catch (err) {
        const error = new Error('Authentication failed!', 403);
        return next(error);
    }
};