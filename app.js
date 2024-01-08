//Creating the express server
require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const connectDB = require('./server/config/db');
const {isActiveRoute} = require('./server/helpers/routeHelpers');

const app = express(); //creates an express application
const PORT = 5000 || process.env.PORT;


// Connect to DB:
connectDB();

//for searchbar:
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());
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


app.locals.isActiveRoute = isActiveRoute;


app.use('/', require('./server/routes/main')); //calls server/routes/main.js when on homepage (/)
app.use('/', require('./server/routes/admin'));

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
}) //tell the application to listen on the port