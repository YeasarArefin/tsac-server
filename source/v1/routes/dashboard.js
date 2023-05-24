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

			const monthlyIncome = await invoiceCollection.aggregate([
				{
					$group: {
						_id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } }, // Group by month
						totalPayment: { $sum: '$payment' } // Calculate sum of payments
					}
				},
				{
					$project: {
						_id: 0, // Exclude the default _id field
						month: '$_id',
						totalPayment: 1
					}
				}
			]).exec();

			const monthlyExpenditure = await expenditureCollection.aggregate([
				{
					$group: {
						_id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } }, // Group by month
						amount: { $sum: '$amount' } // Calculate sum of payments
					}
				},
				{
					$project: {
						_id: 0, // Exclude the default _id field
						month: '$_id',
						amount: 1
					}
				}
			]).exec();

			for (const { payment } of invoiceData) {
				totalIncome += payment;
			}
			for (const { amount } of expenditureData) {
				totalExpenditure += amount;
			}
			res.status(200).json({ income: totalIncome, monthlyIncome, expenditure: totalExpenditure, monthlyExpenditure, net: totalIncome - totalExpenditure, teachers: numberOfTeachers, students: numberOfStudents });
		} catch (error) {
			res.status(500).json({ error: error });
		}
	});
module.exports = dashboard;