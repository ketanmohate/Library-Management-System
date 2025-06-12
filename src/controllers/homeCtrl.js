let LMSmodels = require("../models/LMSmodels");

exports.home = ((req, res) => {
    res.render("home.ejs");
})

exports.login = ((req, res) => {
    res.render("Login.ejs");
})

exports.about = ((req, res) => {
    res.render("about.ejs");
})


exports.viewAllBooks = async (req, res) => {
    try {
        const books = await LMSmodels.getAllBooks();
        console.log(books);
        res.render("viewBooks.ejs", { books });  
    } catch (err) {
        console.error("Error fetching profile data:", err);
        res.render("error");
    }
};



exports.userLogin = ((req, res) => {
    let {
        username,
        password
    } = req.body;

    // console.log(username);
    // console.log(password);

    if (username === "admin" && password === "admin@123") {
        res.render("adminDashboard.ejs");
    }
    else {
        res.render("error");
    }

})