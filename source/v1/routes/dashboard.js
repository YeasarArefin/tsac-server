const accountsCollection = require('../models/accounts.model');
const invoiceCollection = require('../models/invoice.model');

const dashboard = require('express').Router();

dashboard
   .route('/')
   .get(async (req, res) => {
      try {
         const invoiceData = await invoiceCollection.find({});
         const numberOfStudents = await accountsCollection.countDocuments({ role: "student" });
         const numberOfTeachers = await accountsCollection.countDocuments({ role: "teacher" });
         let totalIncome = 0;
         for (const { payment } of invoiceData) {
            totalIncome += payment;
         }
         res.status(200).json({ income: totalIncome, teachers: numberOfTeachers, students: numberOfStudents });
      } catch (error) {
         res.status(500).json({ error: error });
      }
   });
module.exports = dashboard;