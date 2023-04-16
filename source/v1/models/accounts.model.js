const mongoose = require('mongoose');

const accountsSchema = mongoose.Schema({
  name: { type: String, required: [true, 'Provide a name'], },
  phone: { type: String, required: [true, 'Provide a number'] },
  email: { type: String, required: [true, 'Provide an email'] },
  institute: { type: String, default: '' },
  role: { type: String, enum: ['student', 'teacher'], required: [true, 'Select a role'] },
  standard: { type: [String, Array], required: [true, 'Select a class standard'] },
  subjects: { type: [String, Array], required: [true, 'Select some subjects'] },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});
const accountsCollection = new mongoose.model('Accounts', accountsSchema);
module.exports = accountsCollection;