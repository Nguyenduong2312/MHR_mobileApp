const express = require('express');
const fileUpload = require('express-fileupload');
const session = require('express-session');

const app = express();
const route = require('./routes');
const db = require('./config/db');
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    session({
        resave: true,
        saveUninitialized: true,
        secret: 'somesecret',
        cookie: { maxAge: 600000000000000000 },
    }),
);
app.use(fileUpload());

// Connect to DB
db.connect();

// Routes init
route(app);
//  Download Endpoint
app.listen(port, () => console.log(`Server started on port ${port}...`));
