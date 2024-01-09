//Creating the express server
require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const connectDB = require('./server/config/db');

const app = express(); //creates an express application
const PORT = 5000 || process.env.PORT;

// Body-Parser Middleware
app.use(express.urlencoded({ extended: true }));

// Connect to DB:
connectDB();

app.use(express.json());

app.use(methodOverride('_method'));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    }),
    //cookie: {maxAge: new Date ( Date.now() + (3600000))}
}));


app.use(express.static('public')); //referes to the public folder


//Middleware Template Engine
app.use(expressLayout);
app.set('layout', './layouts/main'); //set default layout to main.ejs
app.set('view engine', 'ejs');



app.use('/', require('./server/routes/main')); //calls server/routes/main.js when on homepage (/)

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
}) //tell the application to listen on the port