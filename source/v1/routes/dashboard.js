const verifyJWT = require('../../utils/middleware/verifyJWT');
const accountsCollection = require('../models/accounts.model');
const expenditureCollection = require('../models/expenditure.model');
const invoiceCollection = require('../models/invoice.model');
const dashboard = require('express').Router();

dashboard
	.route('/')
	.get(verifyJWT, async (req, res) => {

		const decodedEmail = req.decoded.email;
		if (decodedEmail !== process.env.ADMIN_EMAIL) {
			return res.status(401).send({ message: 'unauthorized access' });
		}

		try {
			let totalIncome = 0;
			let totalExpenditure = 0;
			const invoiceData = await invoiceCollection.find({});
			const expenditureData = await expenditureCollection.find({});
			const numberOfStudents = await accountsCollection.countDocuments({ role: "student" });
			const numberOfTeachers = await accountsCollection.countDocuments({ role: "teacher" });
			const currentYear = new Date().getFullYear();
			const currentMonth = new Date().getMonth() + 1;
			const monthlyChart = [];
			const yearlyChart = {
				year: 0,
				income: 0,
				expenditure: 0
			};

			const perMonthIncome = await invoiceCollection.aggregate([
				{
					$match: {
						createdAt: {
							$gte: new Date(currentYear, 0, 1), // Start of the current year
							$lt: new Date(currentYear + 1, 0, 1), // Start of the next year
						},
					},
				},
				{
					$group: {
						_id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } }, // Group by month
						totalPayment: { $sum: '$payment' }, // Calculate sum of payments
					},
				},
				{
					$project: {
						_id: 0, // Exclude the default _id field
						month: '$_id',
						totalPayment: 1,
					},
				},
			]).exec();

			const perMonthExpenditure = await expenditureCollection.aggregate([
				{
					$match: {
						createdAt: {
							$gte: new Date(currentYear, 0, 1), // Start of the current year
							$lt: new Date(currentYear + 1, 0, 1), // Start of the next year
						},
					},
				},
				{
					$group: {
						_id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } }, // Group by month
						amount: { $sum: '$amount' }, // Calculate sum of payments
					},
				},
				{
					$project: {
						_id: 0, // Exclude the default _id field
						month: '$_id',
						amount: 1,
					},
				},
			]).exec();


			for (const { payment } of invoiceData) {
				totalIncome += payment;
			}
			for (const { amount } of expenditureData) {
				totalExpenditure += amount;
			}

			for (let i = 0; i < perMonthIncome.length; i++) {
				const monthIncome = perMonthIncome[i];
				const monthExpenditure = perMonthExpenditure.find(expenditure => expenditure.month === monthIncome.month);

				const combinedEntry = {
					"month": monthIncome.month,
					"income": monthIncome.totalPayment,
					"expenditure": monthExpenditure ? monthExpenditure.amount : 0
				};

				monthlyChart.push(combinedEntry);
			}

			monthlyChart.forEach((entry) => {
				const [year] = entry.month.split("-");

				yearlyChart.year = year;
				yearlyChart.income += entry.income;
				yearlyChart.expenditure += entry.expenditure;
			});


			res.status(200).json({
				income: totalIncome,
				expenditure: totalExpenditure,
				net: totalIncome - totalExpenditure,
				teachers: numberOfTeachers,
				students: numberOfStudents,
				monthlyChart,
				yearlyChart: [yearlyChart],

			});
		} catch (error) {
			res.status(500).json({ error: error });
		}
	});
module.exports = dashboard;
