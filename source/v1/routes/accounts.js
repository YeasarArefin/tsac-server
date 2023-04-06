const accounts = require('express').Router();
const accountsCollection = require('../models/accounts.model');
accounts
    .route('/')
    .get(async (req, res) => {
        const email = req.query.email;
        if (email) {
            const data = await accountsCollection.find({ email });
            res.send(data);
        } else {
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

        }

    });

module.exports = accounts;
