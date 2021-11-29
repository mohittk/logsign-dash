const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const dotenv = require('dotenv');
const passport = require('passport');
const user = require('./routefold/api/users');


const app = express();


app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json());

const db = require('./config/key').mongoURI;

mongoose.connect(db,{useNewUrlParser:true})
.then(()=>console.log('connection successful'))
.catch(err => console.log(err));

app.use(passport.initialize());

require("./config/passport")(passport);
app. use("/api/users", user);

const port = process.env.PORT || 5000;

app.listen(port,()=>console.log('server is running on port ${port}'));

