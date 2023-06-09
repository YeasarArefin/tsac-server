const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const cors = require('cors');

const port = process.env.PORT || 5000;
const db = require('./source/db/db.config');
const accounts = require('./source/v1/routes/accounts');
const createaccount = require('./source/v1/routes/createaccount');
const admin = require('./source/utils/firebase/firebase.init');
const invoice = require('./source/v1/routes/invoice');
const dashboard = require('./source/v1/routes/dashboard');
const expenditure = require('./source/v1/routes/expenditure');
const jwtRoute = require('./source/v1/routes/jwt');
require('colors');


// middleware
app.use(express.json());
app.use(cors());

// end-points
app.use('/api/v1/accounts', accounts);
app.use('/api/v1/createaccount', createaccount);
app.use('/api/v1/invoice', invoice);
app.use('/api/v1/dashboard', dashboard);
app.use('/api/v1/expenditure', expenditure);
app.use('/api/v1/jwt', jwtRoute);

app.get('/', (req, res) => {
    res.send(
        '<div style="display:flex;height:90vh;justify-content:center;align-items:center;font-family: system-ui;"><h1>TSAC-Server</h1></div>',
    );
});

// app.post('/jwt', (req, res) => {
//     const user = req.body;
//     const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.status(200).send({ token });
// });

app.get('*', (req, res) => {
    res.send(
        '<div style="display:flex;height:90vh;justify-content:center;align-items:center;font-family: system-ui;"><h1>Not Found</h1></div>',
    );
});

app.listen(port, () => {
    db(), console.log(`http://localhost:${port}/`.blue);
});
