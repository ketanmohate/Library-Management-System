let express = require("express");
let bodyParser = require("body-parser");
let session = require("express-session");
let cookieParser = require("cookie-parser");

const LMSroutes = require('./routes/LMSroutes.js');
const issueRoutes = require("./routes/issueRoutes.js");

let conn = require("./config/db.js");

let app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.use(cookieParser());

app.use(session({
    secret: "abc123",
    resave: false,
    saveUninitialized: false
}));

app.set('view engine', 'ejs');

// ✅ Mount routes
app.use("/", LMSroutes);
app.use("/", issueRoutes); // <-- Add this to use issueRoutes

module.exports = app;
