var admin = require("firebase-admin");

var serviceAccount = require("../../../medical-site-d0938-firebase-adminsdk-qc7qc-bd2dc038ca.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;