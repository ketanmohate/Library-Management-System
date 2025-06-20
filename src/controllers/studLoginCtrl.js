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
            return res.redirect("/login");
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
    try{
        let books = await studLoginModels.getAllBooksUser();
        res.render("userViewBook.ejs",{books});
    }catch(err){

    }
}

exports.showStudIssuedBook = async (req, res)=>{
    try{

        // let books = await studLoginModels.showStudIssuedBook();


    }catch{

    }
}