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
        // console.log(books);
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

exports.addSudentPage = (req, res) => {
    // console.log("Hello");
    res.render("addStudentForm.ejs");
};


exports.addStudent = ((req, res)=>{
    let {
        student_name,
        student_email,
        student_password,
        confirm_password,
    } = req.body;
    console.log(student_name);
    console.log(student_email);
    console.log(student_password);
    console.log(confirm_password);

    let name = student_name.trim();
    let email = student_email.trim();
    let password = student_password.trim();
    let confirm_pass = confirm_password.trim();

    if(student_password === confirm_password){
        LMSmodels.addStudent(name, email, password);
    }else{

    }

})