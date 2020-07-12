const { validationResult } = require('express-validator');

module.exports = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed');
        error.statusCode = 422;
        error.data = errors.array();
        return res.status(error.statusCode).json({
            message: error.data[0].msg,
            data: error.data[0]
        });
    }
    next();
};