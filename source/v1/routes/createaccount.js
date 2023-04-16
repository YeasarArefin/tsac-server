const createaccount = require('express').Router();
const accountsCollection = require('../models/accounts.model');
const admin = require('../../utils/firebase/firebase.init');

/* 

* post : need email,password

*/

createaccount
    .route('/')
    .get(async (req, res) => {
        res.send('create account');
    })
    .post(async (req, res) => {
        const { email, password } = req.body;
        console.log(req.body);
        admin.auth().createUser({
            email: email,
            password: password,
        })
            .then(async (userRecord) => {

                try {
                    if (userRecord) {
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

    });
module.exports = createaccount;