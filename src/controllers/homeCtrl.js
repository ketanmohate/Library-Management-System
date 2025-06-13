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

exports.dashbord=((req, res) =>{
    res.render("adminDashboard.ejs");
})

exports.categories = ((req, res) =>{
    res.render("addCategories.ejs");
})

exports.Viewstudent=async (req,res)=>{
   
    try{
        const stud = await LMSmodels.viewAllstudents();
        console.log(stud);
         res.render("viewStudent.ejs",{stud});
    }
    catch(err){
        console.log(err);
        res.render("error");
    }
}

exports.addcategories = (req, res) => {
    try {
        console.log(req.body); // Add this line to debug

        const name = req.body.name.trim();
        console.log(name);

        const result = LMSmodels.getaddcategories(name);
        res.render("addCategories.ejs");
        console.log(result);
    } catch (err) {
        console.log(err);
        res.render("error.ejs");
    }
};


exports.searchStud = async (req, res) => {
    try {
        const searchValue = req.query.sd;
        console.log("Received search value:", searchValue); // ✅ ADD THIS

        const stud = await LMSmodels.searchAllStudent(searchValue);
        console.log("Search result:", stud); // ✅ ADD THIS

        res.json(stud);  // Send JSON for AJAX, don't render EJS here
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Something went wrong" });
    }
};


exports.deleteStud = (req, res) => {
    let id = parseInt(req.query.id.trim());

    const result = LMSmodels.getStudentDelete(id);
    result.then((r) => {
        res.render("viewStudent.ejs", { stud: r });
    }).catch((err) => {
        console.error(err);
        res.render("viewStudent.ejs");
    });
}


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
        res.render("error.ejs");
    }
});
