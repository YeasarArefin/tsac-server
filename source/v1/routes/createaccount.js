const createaccount = require('express').Router();
const accountsCollection = require('../models/accounts.model');
const admin = require('../../utils/firebase/firebase.init');
const verifyJWT = require('../../utils/middleware/verifyJWT');

/* 

* post : need email,password

*/

createaccount
    .route('/')
    .post(verifyJWT, async (req, res) => {
        const { email, password } = req.body;
        const decodedEmail = req.decoded.email;
        if (decodedEmail !== process.env.ADMIN_EMAIL) {
            return res.status(401).send({ message: 'unauthorized access' });
        }

        admin.auth().createUser({
            email: email,
            password: password,
        })
            .then(async (userRecord) => {

                try {
                    if (userRecord) {
                        req.body.uid = userRecord.uid;
                        const data = new accountsCollection(req.body);
                        const response = await data.save();
                        res.status(200).json(response);
                    }
                } catch (error) {
                    console.log(error);
                }

            })
            .catch((error) => {
                console.error('Error creating new user:', error);
            });

    })
    .delete(verifyJWT, async (req, res) => {

        try {
            const { _id } = req.body;
            const decodedEmail = req.decoded.email;

            if (decodedEmail !== process.env.ADMIN_EMAIL) {
                return res.status(401).send({ message: 'unauthorized access' });
            }
            const account = await accountsCollection.findById(_id);
            const uid = account.uid;
            const auth = admin.auth();
            await auth.deleteUser(uid);
            await accountsCollection.findByIdAndDelete(_id);
            res.status(200).send({ message: 'Account deleted successfully' });

        } catch (error) {
            console.log("🚀 ~ file: createaccount.js:56 ~ .delete ~ error:", error);
        }

    });
module.exports = createaccount;