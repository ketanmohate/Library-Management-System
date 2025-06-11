let express = require("express");

let app = express();

app.use(express.static('public'));
// app.use("/", routes);

app.set('view engine', 'ejs');

module.exports = app;