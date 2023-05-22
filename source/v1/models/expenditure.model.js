const mongoose = require('mongoose');

const expenditureSchema = mongoose.Schema({
    amount: { type: Number, required: true },
    description: { type: String, required: true }
}, {
    timestamps: true
});

const expenditureCollection = new mongoose.model('Expenditure', expenditureSchema);
module.exports = expenditureCollection;