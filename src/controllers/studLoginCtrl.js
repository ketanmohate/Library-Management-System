const LMSmodels = require("../models/LMSmodels.js");
const router = require("../routes/LMSroutes");
const studLoginModels = require("../models/studLoginModels.js");

exports.userDashboard = (req, res) => {
    res.render("userDashboard.ejs");
}

exports.userProfile = async (req, res) => {
    try {
        // ✅ Check session before accessing email
        if (!req.session.user || !req.session.user.email) {
            return res.redirect("");
        }

        const email = req.session.user.email;
        console.log("Fetching profile for email:", email); // debug

        const user = await studLoginModels.getUser(email); // getUser should accept email

        if (user.length > 0) {
            res.render("userProfile.ejs", { user: user[0], msg: null });
        } else {
            res.render("userProfile.ejs", { user: null, msg: "User not found" });
        }

    } catch (err) {
        console.error("Profile error:", err);
        res.render("userProfile.ejs", { user: null, msg: "Error loading profile" });
    }
};


exports.userViewBooks = async (req, res) => {
    try {
        let books = await studLoginModels.getAllBooksUser();
        res.render("userViewBook.ejs", { books });
    } catch (err) {

    }
}

exports.showStudIssuedBook = async (req, res) => {
  try {
    if (!req.session.user || !req.session.user.email) {
      return res.redirect("/login"); // give valid redirect
    }

    const email = req.session.user.email;

    const userId = await studLoginModels.getUserId(email);

    if (!userId) {
      return res.render("userIssuedBooks.ejs", {
        issuedData: [],
        msg: "User not found",
      });
    }

    const issuedBooks = await studLoginModels.showStudIssuedBook(userId);

    res.render("userIssuedBooks.ejs", { issuedBooks, msg: null });
  } catch (err) {
    console.error("Error:", err);
    res.render("userIssuedBooks.ejs", {
      issuedData: [],
      msg: "Something went wrong",
    });
  }
};

exports.userHistory = async(req, res)=>{
      try {
    if (!req.session.user || !req.session.user.email) {
      return res.redirect("/login"); // give valid redirect
    }

    const email = req.session.user.email;

    const userId = await studLoginModels.getUserId(email);

    if (!userId) {
      return res.render("userIssuedBooks.ejs", {
        issuedData: [],
        msg: "User not found",
      });
    }

    const issuedBooks = await studLoginModels.userHistory(userId);

    res.render("userIssuedBooks.ejs", { issuedBooks, msg: null });
  } catch (err) {
    console.error("Error:", err);
    res.render("userIssuedBooks.ejs", {
      issuedData: [],
      msg: "Something went wrong",
    });
  }
}