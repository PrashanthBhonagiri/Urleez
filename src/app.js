const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();

const insertUrl = require('./api/insert');

const app = express();

const whitelist = [
    "http://localhost:5000"
];

const corsOptions = {
    origin: function(origin, next) {
        if(whitelist.indexOf(origin) !== -1 || !origin) {
            next(null, true)
        } else {
            next(new Error(`Origin Not allowed by CORS : ${origin}`));
        }
    }
}

app.use(cors(corsOptions));

app.use(morgan('dev'));
app.use(express.json());
app.use(helmet());

app.get('', (req,res) => {
    res.json({"Greetings" : "Welcome to URLeez!!!!!"});
});

app.use('/insert',insertUrl);

module.exports = app;