const mongoose = require('mongoose');
require('dotenv').config();
require('colors');

function db() {
    mongoose.connect(process.env.URI, { dbName: 'Api_Data' })
        .then(() => console.log('Database connected successfully 🚀'.yellow))
        .catch((err) => console.log(`${err}`.red));
}

module.exports = db;