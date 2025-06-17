let express = require("express");
let bodyParser = require("body-parser");
let session = require("express-session");
let cookieParser = require("cookie-parser");

const LMSroutes = require('./routes/LMSroutes.js'); // Correctly required

let conn = require("./config/db.js");

let app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.use("/", LMSroutes); // ✅ Use the correct variable

app.use(session({
    secret : "abc123",
    resave : false,
    saveUninitialized : false
}));

app.set('view engine', 'ejs');
app.use(cookieParser());

module.exports = app;
