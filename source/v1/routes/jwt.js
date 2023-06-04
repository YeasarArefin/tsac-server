const jwtRoute = require('express').Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Create a blacklist array to store invalidated tokens
const tokenBlacklist = [];

jwtRoute.post('/', (req, res) => {
    const user = req.body;
    const accessToken = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '7d' });

    console.log("Access Token:", accessToken);
    console.log("Refresh Token:", refreshToken);

    res.status(200).send({ accessToken, refreshToken });
});

jwtRoute.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken;

    if (!refreshToken || tokenBlacklist.includes(refreshToken)) {
        return res.status(401).json({ message: 'Invalid refresh token' });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
        const { email, role } = decoded;

        const accessToken = jwt.sign({ email, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ accessToken });

    } catch (error) {

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Refresh token has expired. Please reauthenticate.' });
        } else {
            return res.status(401).json({ message: 'Invalid refresh token' });
        }
    }
});


module.exports = jwtRoute;