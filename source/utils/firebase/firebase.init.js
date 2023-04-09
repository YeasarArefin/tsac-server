var admin = require("firebase-admin");

var serviceAccount = require('../firebase/firebase.config');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;