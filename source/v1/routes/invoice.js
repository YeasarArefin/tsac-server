const invoice = require('express').Router();
const invoiceCollection = require('../models/invoice.model');

invoice
	.route('/')
	.get(async (req, res) => {

		try {
			const data = await invoiceCollection.find({});
			res.status(200).send(data);
		} catch (error) {
			res.status(500).send(error);
		}

	})
	.post(async (req, res) => {

		try {
			const response = await invoiceCollection.create(req.body);
			res.status(200).send(response);
		} catch (error) {
			res.status(500).send(error);
		}

	});

module.exports = invoice;