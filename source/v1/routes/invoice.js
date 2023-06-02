const invoice = require('express').Router();
const verifyJWT = require('../../utils/middleware/verifyJWT');
const invoiceCollection = require('../models/invoice.model');

invoice
	.route('/')
	.get(verifyJWT, async (req, res) => {

		const _id = req.query.id;
		const decodedEmail = req.decoded.email;
		if (decodedEmail !== process.env.ADMIN_EMAIL) {
			return res.status(401).send({ message: 'unauthorized access' });
		}

		if (_id) {
			try {
				const data = await invoiceCollection.find({ _id });
				res.status(200).send(data);
			} catch (error) {
				res.status(500).send(error);
			}
		} else {
			try {
				const data = await invoiceCollection.find({});
				res.status(200).send(data);
			} catch (error) {
				res.status(500).send(error);
			}
		}
	})
	.post(verifyJWT, async (req, res) => {

		const decodedEmail = req.decoded.email;
		if (decodedEmail !== process.env.ADMIN_EMAIL) {
			return res.status(401).send({ message: 'unauthorized access' });
		}

		try {
			const response = await invoiceCollection.create(req.body);
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
			await invoiceCollection.findByIdAndDelete(_id);
			res.status(200).send({ message: 'Invoice deleted successfully' });
		} catch (error) {
			console.log("🚀 ~ file: invoice.js:54 ~ .delete ~ error:", error);
		}

	});

module.exports = invoice;