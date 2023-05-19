const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
   name: { type: String, required: true },
   phone: { type: String, required: true },
   email: { type: String, required: true },
   institute: { type: String, required: true },
   vat: { type: Number, required: true },
   discount: { type: Number, required: true },
   fees: { type: Array, required: true },
   payment: { type: Number, required: true },
},
   {
      timestamps: true
   }
);

const invoiceCollection = mongoose.model('Invoice', invoiceSchema);
module.exports = invoiceCollection;