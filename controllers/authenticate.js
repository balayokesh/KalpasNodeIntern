module.exports = (req, res, next) => {
    const jwt = require('jsonwebtoken');
    const token = req.body.token;

    try {
        const decoded = jwt.verify(token, 'secret')
        if (decoded) {
            return next();
        }
        else {
            return res.status(400).json(`Error`);
        }
    }
    catch (err) {
        return res.json(`Error: ${err}`);
    }
}