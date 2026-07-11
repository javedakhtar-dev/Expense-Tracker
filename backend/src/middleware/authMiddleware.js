const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization;

    if(!token) {
        return res.status(401).json({
            error: "Token not found"
        })
    }

    const jwtToken = token.split(" ")[1];

    try {
        const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        return res.status(401).json({
            error: 'Invalid token'
        })
    }
}

module.exports = authMiddleware;