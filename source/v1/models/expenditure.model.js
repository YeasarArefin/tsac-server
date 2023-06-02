const mongoose = require('mongoose');

const expenditureSchema = mongoose.Schema({
    amount: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, default: 'No description' }
}, {
    timestamps: true
});

const expenditureCollection = new mongoose.model('Expenditure', expenditureSchema);
module.exports = expenditureCollection;