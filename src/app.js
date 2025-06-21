let express = require("express");
let bodyParser = require("body-parser");
let cookieParser = require("cookie-parser");
const session = require('express-session');

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
  secret: 'abc123',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // use true if HTTPS
}));

app.set('view engine', 'ejs');

// ✅ Mount routes
app.use("/", LMSroutes);
app.use("/", issueRoutes); // <-- Add this to use issueRoutes


app.get('/booksByCategory', async (req, res) => {
  const category = req.query.category;
  try {
    const books = await Book.find({ category: category }); // or category_name
    res.json({ books: books });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});


module.exports = app;
