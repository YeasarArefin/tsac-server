const accounts = require('express').Router();
const accountsCollection = require('../models/accounts.model');
require('colors');

accounts
    .route('/')
    .get(async (req, res) => {

        const email = req.query.email;
        const role = req.query.role;

        if (email) {

            const data = await accountsCollection.find({ email });
            res.status(200).send(data);

        } else if (role) {

            const data = await accountsCollection.find({ role });
            res.status(200).send(data);

        }
        else {

            const data = await accountsCollection.find({});
            res.send(data);

        }

    })
    .post(async (req, res) => {

        console.log(req.body);

        try {

            const data = await new accountsCollection(req.body);
            const response = await data.save();
            res.status(200).json(response);

        } catch (error) {
            console.log(`${error}`.red);
        }

    });

module.exports = accounts;
