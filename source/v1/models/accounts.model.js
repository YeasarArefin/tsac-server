const mongoose = require('mongoose');

const accountsSchema = mongoose.Schema({
  name: { type: String, required: [true, 'Provide a name'], },
  email: { type: String, required: [true, 'Provide an email'] },
  phone: { type: String, required: [true, 'Provide a number'] },
  standard: { type: [String, Array], required: [true, 'Select a class standard'] },
  role: { type: String, enum: ['student', 'teacher'], required: [true, 'Select a role'] },
}, {

  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }

});
const accountsCollection = new mongoose.model('Accounts', accountsSchema);
module.exports = accountsCollection;