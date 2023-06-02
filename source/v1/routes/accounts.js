const accounts = require('express').Router();
const verifyJWT = require('../../utils/middleware/verifyJWT');
const accountsCollection = require('../models/accounts.model');
require('colors');

accounts
    .route('/')
    .get(verifyJWT, async (req, res) => {

        const email = req.query.email;
        const role = req.query.role;

        const decodedEmail = req.decoded.email;
        if (decodedEmail !== process.env.ADMIN_EMAIL) {
            return res.status(401).send({ message: 'unauthorized access' });
        }


        if (email) {

            const data = await accountsCollection.find({ email });
            res.status(200).send([...data, req.decoded]);

        } else if (role) {

            const data = await accountsCollection.find({ role });
            res.status(200).send(data);

        }
        else {

            const data = await accountsCollection.find({});
            res.send(data);

        }

    })
    .post(verifyJWT, async (req, res) => {

        const decodedEmail = req.decoded.email;
        if (decodedEmail !== process.env.ADMIN_EMAIL) {
            return res.status(401).send({ message: 'unauthorized access' });
        }

        try {

            const data = await new accountsCollection(req.body);
            const response = await data.save();
            res.status(200).json(response);

        } catch (error) {
            console.log(`${error}`.red);
        }

    });

module.exports = accounts;
