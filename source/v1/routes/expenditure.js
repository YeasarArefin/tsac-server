const verifyJWT = require('../../utils/middleware/verifyJWT');
const expenditureCollection = require('../models/expenditure.model');

const expenditure = require('express').Router();

expenditure
    .route('/')
    .get(verifyJWT, async (req, res) => {

        const decodedEmail = req.decoded.email;
        if (decodedEmail !== process.env.ADMIN_EMAIL) {
            return res.status(401).send({ message: 'unauthorized access' });
        }

        try {
            const data = await expenditureCollection.find({});
            res.status(200).send(data);
        } catch (error) {
            res.status(500).send(error);
        }

    })
    .post(verifyJWT, async (req, res) => {

        const decodedEmail = req.decoded.email;
        if (decodedEmail !== process.env.ADMIN_EMAIL) {
            return res.status(401).send({ message: 'unauthorized access' });
        }

        try {
            const response = await expenditureCollection.create(req.body);
            res.status(200).send(response);
        } catch (error) {
            res.status(500).send(error);
        }
    })
    .delete(verifyJWT, async (req, res) => {
        const decodedEmail = req.decoded.email;
        if (decodedEmail !== process.env.ADMIN_EMAIL) {
            return res.status(401).send({ message: 'unauthorized access' });
        }
        try {

            const _id = req.body._id;
            await expenditureCollection.findByIdAndDelete(_id);
            res.status(200).send({ message: 'Expenditure deleted successfully' });

        } catch (error) {
            console.log("🚀 ~ file: expenditure.js:45 ~ .delete ~ error:", error);
        }
    });

module.exports = expenditure;