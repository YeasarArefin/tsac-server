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
			const currentYear = new Date().getFullYear();
			const currentMonth = new Date().getMonth() + 1; // Months are zero-based, so add 1 to get the current month
			const monthlyChart = [];
			const yearlyChart = {};

			// monthlyChart.push({
			// 	"month": "2024-05",
			// 	"income": 13517,
			// 	"expenditure": 2500
			// });
			// monthlyChart.push({
			// 	"month": "2024-09",
			// 	"income": 13517,
			// 	"expenditure": 100
			// });

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

				// If the year entry doesn't exist, create it
				if (!yearlyChart[year]) {
					yearlyChart[year] = {
						year: parseInt(year),
						income: 0,
						expenditure: 0,
					};
				}

				// Add the income and expenditure to the corresponding year
				yearlyChart[year].income += entry.income;
				yearlyChart[year].expenditure += entry.expenditure;
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
