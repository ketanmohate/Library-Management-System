let express = require("express");
let bodyParser = require("body-parser");
// let session = require();
let cookieParser = require("cookie-parser");

let routers = require("./routes/LMSroutes");

// let conn = require("./config/db.js");

let app = express();

// app.use(bodyparser.urlencoded({
//     extended: true
// }));

// app.use(bodyparser.json());

app.use(express.static('public'));

// app.use(session({
//     secret : "abc123",
//     resave : false,
//     saveUninitialized : false
// }))


app.use("/", routers);

app.set('view engine', 'ejs');

app.use(cookieParser());

module.exports = app;