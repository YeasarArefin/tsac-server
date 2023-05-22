const accountsCollection = require('../models/accounts.model');
const expenditureCollection = require('../models/expenditure.model');
const invoiceCollection = require('../models/invoice.model');

const dashboard = require('express').Router();

dashboard
	.route('/')
	.get(async (req, res) => {
		try {
			let totalIncome = 0;
			let totalExpenditure = 0;
			const invoiceData = await invoiceCollection.find({});
			const expenditureData = await expenditureCollection.find({});
			const numberOfStudents = await accountsCollection.countDocuments({ role: "student" });
			const numberOfTeachers = await accountsCollection.countDocuments({ role: "teacher" });
			for (const { payment } of invoiceData) {
				totalIncome += payment;
			}
			for (const { amount } of expenditureData) {
				totalExpenditure += amount;
			}
			res.status(200).json({ income: totalIncome, expenditure: totalExpenditure, net: totalIncome - totalExpenditure, teachers: numberOfTeachers, students: numberOfStudents });
		} catch (error) {
			res.status(500).json({ error: error });
		}
	});
module.exports = dashboard;