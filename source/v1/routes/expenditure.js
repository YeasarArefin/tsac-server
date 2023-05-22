const expenditureCollection = require('../models/expenditure.model');

const expenditure = require('express').Router();

expenditure
    .route('/')
    .get(async (req, res) => {
        try {
            const data = await expenditureCollection.find({});
            res.status(200).send(data);
        } catch (error) {
            res.status(500).send(error);
        }

    })
    .post(async (req, res) => {
        try {
            const response = await expenditureCollection.create(req.body);
            res.status(200).send(response);
        } catch (error) {
            res.status(500).send(error);
        }
    });

module.exports = expenditure;