let express = require("express");
let bodyparser = require("body-parser");
let session = require("express-session");

let app = express();

app.set('view engin','ejs');

module.exports=app;