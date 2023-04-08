const express = require('express');

const app = express();
const cors = require('cors');

const port = process.env.PORT || 5000;
const db = require('./source/db/db.config');
const accounts = require('./source/v1/routes/accounts');
const createaccount = require('./source/v1/routes/createaccount');
const admin = require('./source/utils/firebase/firebase.init');
require('colors');


// middleware
app.use(express.json());
app.use(cors());
// end-points

app.use('/api/v1/accounts', accounts);
app.use('/api/v1/createaccount', createaccount);

app.get('/', (req, res) => {
    res.send(
        '<div style="display:flex;height:90vh;justify-content:center;align-items:center;font-family: system-ui;"><h1>TSAC-Server</h1></div>',
    );
});

app.get('*', (req, res) => {
    res.send(
        '<div style="display:flex;height:90vh;justify-content:center;align-items:center;font-family: system-ui;"><h1>Not Found</h1></div>',
    );
});

app.listen(port, () => {
    db(), console.log(`http://localhost:${port}/`.blue);
});
