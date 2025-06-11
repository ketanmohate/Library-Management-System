let express = require("express");
let routes=require("../src/routes/routes");

let app = express();

app.use(express.static('public'));
app.use("/",routes);

app.set('view engine', 'ejs');

module.exports = app;