let LMSmodels = require("../models/LMSmodels");

exports.home = ((req, res) => {
    res.render("home.ejs");
})

exports.login = ((req, res) => {
    res.render("Login.ejs",{msg : ""});
})

exports.about = ((req, res) => {
    res.render("about.ejs");

})

exports.dashbord = ((req, res) => {
    res.render("adminDashboard.ejs", { msg: "" });
})

exports.categories = ((req, res) => {
    res.render("addCategories.ejs");
})



exports.addSudentPage = ((req, res) => {
    // console.log("Hello");
    res.render("addStudentForm.ejs", { msg: "" });
});

exports.addBookPage = ((req,res) => {
      const result = LMSmodels.getViewcategorie();
    result.then((r)=>{
        res.render("addBooks.ejs",{cat:r});
    }).catch((err)=>{
        res.render("error.ejs");
    })

  
})
exports.userLogin = ((req, res) => {
    let {
        username,
        password
    } = req.body;

    // console.log(username);
    // console.log(password);

    if (username === "admin" && password === "admin@123") {
        res.render("adminDashboard.ejs", { msg: "Select a section from the sidebar to manage Students, Categories, or Books." });
    }
    else {
        res.render("Login.ejs", { msg:"Username Or Password is invalid"});
    }
});



exports.addStudent = ((req, res) => {
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

    if (student_password === confirm_password) {
        let result = LMSmodels.addStudent(name, email, password);
        result
            .then(() => {
                res.render("adminDashboard.ejs", { msg: "Student Data Added Successfully" });
            })
            .catch((err) => {
                // console.error(err);
                res.render("adminDashboard.ejs", { msg: "Some Problem is there" });
            });
    } else {
        res.render("addStudentForm.ejs", { msg: "Plz Enter Your Password And Confirm Password should be Same" });
    }

});

exports.Viewstudent = async (req, res) => {

    try {
        const stud = await LMSmodels.viewAllstudents();
        console.log(stud);
        res.render("viewStudent.ejs", { stud });
    }
    catch (err) {
        console.log(err);
        res.render("error.ejs");
    }
}

exports.addcategories = async (req, res) => {

    try {

        let name = req.body.name.trim();
        console.log(name);
        
        const result = await LMSmodels.getaddcategories(name);
        res.render("adminDashboard.ejs", { msg: "Categorie Data Added Successfully" });
        console.log(result);
    } catch (err) {
        console.log(err);
        res.render("error.ejs");
    }
};

exports.Viewcategorie = async (req, res) =>{
    try{
        const cat = await LMSmodels.getViewcategorie();
        res.render("viewCategories",{cat});
    }catch(err){
        res.render("error.ejs");
    }
}

exports.searchCat =  async (req, res) => {
    try {
        const searchValue = req.query.cd;
        console.log("Received search value:", searchValue); // ✅ ADD THIS

        const cat = await LMSmodels.getsearchCat(searchValue);
        console.log("Search result:", cat); // ✅ ADD THIS

        res.json(cat);  // Send JSON for AJAX, don't render EJS here
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Something went wrong" });
    }
};

exports.addBooks = ((req, res) => {
    let {
    title
    ,author
    ,publisher
    ,isbn
    ,category
    ,total_copies
    ,available_copies
    ,status
    ,image
    } = req.body;

    let book_title = title.trim();
    let book_author = author.trim();
    let book_publisher = publisher.trim();
    let book_isbn = isbn.trim();
    let book_category = category.trim();
    let book_total_copies = total_copies.trim();
    let book_available_copies = available_copies.trim();
    let book_status = status.trim();
    let book_image = image.trim();
    // let book_created_at = created_at.trim();

    let result = LMSmodels.getaddBooks(book_title,book_author, book_publisher, book_isbn, book_category,book_total_copies, book_available_copies, book_status, book_image);
    result.then(() => {
        res.render("adminDashboard.ejs",{msg:"Book is added successfuly"});
    }) .catch((err) => {
                
                res.render("adminDashboard.ejs", { msg: "Some Problem is there" });
            });
});

exports.viewAllBooks = async (req, res) => {
    try {
        const books = await LMSmodels.getAllBooks();
        // console.log(books);
        res.render("viewBooks.ejs", { books: books});  
    } catch (err) {
        console.error("Error fetching profile data:", err);
        res.render("error.ejs");
    }
}

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
        res.render("viewStudent.ejs", { stud: [] });
    });
}

exports.beforeupdateStud = async (req, res) => {
    let id = parseInt(req.query.id.trim());
    console.log("update "+id);
     try {
        const stud  = await LMSmodels.getbeforeupdateStud(id);
        console.log(stud);
        res.render("updateStudent.ejs", { stud ,msg:""});
    }
    catch (err) {
        console.log(err);
        res.render("error");
    }

}

exports.afterupdateStud = (req, res) => {
    let {
        student_id,
        student_name,
        student_email,
        student_password,
        confirm_password,
    } = req.body;

    console.log(student_name);
    console.log(student_email);
    console.log(student_password);
    console.log(confirm_password);

    let id =student_id.trim();
    let name = student_name.trim();
    let email = student_email.trim();
    let password = student_password.trim();
    let confirm_pass = confirm_password.trim();
    if (student_password === confirm_password) {
        let result = LMSmodels.getafterupdateStud(name, email, password,id);
        result
            .then(() => {
                res.render("adminDashboard.ejs", { msg: "Student Data updated Successfully" });
            })
            .catch((err) => {
                // console.error(err);
                res.render("adminDashboard.ejs", { msg: "Some Problem is there" });
            });
    } else {
        res.render("updateStudent.ejs", { 
            stud: [{
                id: id,
                name: name,
                email: email,
                password: password
            }], 
            msg: "Please ensure Password and Confirm Password are the same." 
        });
     }
}

exports.deleteCat = (req, res) => {
   let id = req.query.id;
    console.log(id);
    const result=  LMSmodels.getdelCategorie(id);
    result.then((c) => {
       
        res.render("viewCategories.ejs", { cat: c });
    }).catch((err) => {
        
       res.redirect("/viewCategories");

    });
}


exports.beforeupdateCat = async (req, res) =>{
    let id = (req.query.id || "").trim();
    try{
        const cat = await LMSmodels.getbeforeupdateCat(id);
        res.render("updateCategories.ejs",{cat, msg:""});
    }catch(err){
        res.render("adminDashboard.ejs");
    }
}

exports.afterupdateCat = (req, res) => {
    let id = req.body.id.trim();
    let name= req.body.name.trim();

    let result = LMSmodels.getafterupdateCat(name,id);
     result.then(() => {
                res.render("adminDashboard.ejs", { msg: "Category Data updated Successfully" });
            })
            .catch((err) => {
                // console.error(err);
                res.render("adminDashboard.ejs", { msg: "Some Problem is there" });
            });

}

exports.beforeupdateBook = async(req, res) => {
    let id = (req.query.id || "").trim();
    try{
        let books = await LMSmodels.getbeforeupdateBook(id);
        let cat = await LMSmodels.getViewcategorie(id);
        res.render("updateBooks.ejs",{books,cat});
    } catch(err){
        res.render("adminDashboard.ejs");
    }
}

exports.afterupdateBook = (req, res) => {
    let {
        id,
    title
    ,author
    ,publisher
    ,isbn
    ,category
    ,total_copies
    ,available_copies
    ,status
    } = req.body;

    let book_id = id.trim();
    let book_title = title.trim();
    let book_author = author.trim();
    let book_publisher = publisher.trim();
    let book_isbn = isbn.trim();
    let book_category = category.trim();
    let book_total_copies = total_copies.trim();
    let book_available_copies = available_copies.trim();
    let book_status = status.trim();

    let result = LMSmodels.getafterupdateBook(book_title, book_author, book_publisher, book_isbn, book_category,book_total_copies, book_available_copies, book_status, book_image,book_id);
    result.then(() => {
        res.render("adminDashboard.ejs",{msg:"Book data updated successfuly"});
    }) .catch((err) => {
                
                res.render("adminDashboard.ejs", { msg: "Some Problem is there" });
            });
}

exports.deleteBook= (req, res) => {
    let id = req.query.id.trim();

    const result = LMSmodels.getDeleteBook(id);
    result.then((c) => {
       
        res.render("viewBooks.ejs",{books: c});
    }).catch((err) => {
        
       res.redirect("/viewBooks");

    });
}