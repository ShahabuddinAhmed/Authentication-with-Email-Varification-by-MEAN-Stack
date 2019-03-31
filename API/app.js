const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');

const userRoutes = require('./api/routes/user/user');

mongoose.connect('mongodb://localhost:27017/Authentication', {
    useNewUrlParser: true,
    useCreateIndex: true
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use('/user', userRoutes);

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
     res.json({
         error: {
             message: error.message
         }
     });
});

module.exports = app;