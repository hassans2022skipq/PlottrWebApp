const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    try {
        const token = req.cookies.token;
        const decoded = jwt.verify(token, 'secret');
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(401);
    }
};

module.exports = { protect };
