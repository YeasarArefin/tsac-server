var admin = require("firebase-admin");

var FIREBASE_SERVICE_ACCOUNT
    = require('../firebase/firebase.config');
admin.initializeApp({
    credential: admin.credential.cert(FIREBASE_SERVICE_ACCOUNT)
});

module.exports = admin;