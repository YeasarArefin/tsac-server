const jwtRoute = require('express').Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

jwtRoute
    .post('/', (req, res) => {
        const user = req.body;
        const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log("🚀 ~ file: jwt.js:7 ~ .post ~ token:", token);
        res.status(200).send({ token });
    });

module.exports = jwtRoute;