const { Router } = require("express");
const LMSmodels = require("../models/LMSmodels.js");
const router = require("../routes/LMSroutes");

exports.home = ((req, res) => {
    res.render("home.ejs");
})

exports.login = ((req, res) => {
    res.render("Login.ejs", { msg: "" });
})

exports.about = ((req, res) => {
    res.render("about.ejs");

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
        res.render("Login.ejs", { msg: "Username Or Password is invalid" });
    }
});

exports.dashbord = ((req, res) => {
    res.render("adminDashboard.ejs", { msg: "" });
})





// students routers

exports.addSudentPage = ((req, res) => {
    // console.log("Hello");
    res.render("addStudentForm.ejs", { msg: "" });
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

    // if (student_password === confirm_password) {
    //     let result = LMSmodels.addStudent(name, email, password);
    //     result.then(
    //         res.render("adminDashboard.ejs", { msg: "Student Data Added Successfully" })
    //     ).catch(
    //         res.render("adminDashboard.ejs", { msg: "Some Proble is there" })
    //     )
    // } else {
    //     res.render("addStudentForm.ejs", { msg: "Invalid data entry" });
    // }

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
        res.render("error");
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

exports.beforeupdateStud = async (req, res) => {
    let id = parseInt(req.query.id.trim());
    console.log("update " + id);
    try {
        const stud = await LMSmodels.getbeforeupdateStud(id);
        console.log(stud);
        res.render("updateStudent.ejs", { stud, msg: "" });
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

    let id = student_id;
    let name = student_name.trim();
    let email = student_email.trim();
    let password = student_password.trim();
    let confirm_pass = confirm_password.trim();
    if (student_password === confirm_password) {
        let result = LMSmodels.getafterupdateStud(name, email, password, id);
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
        // res.render("updateStudent.ejs", {stud, msg: "Plz Enter Your Password And Confirm Password should be Same" });
    }
}

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

// end student routers


// categories Routers

exports.categories = ((req, res) => {
    res.render("addCategories.ejs");
})

exports.addcategories = (req, res) => {
    try {
        console.log(req.body); // Add this line to debug

        const name = req.body.name.trim();
        console.log(name);

        const result = LMSmodels.getaddcategories(name);
        res.render("adminDashboard.ejs", { msg: "Categorie Data Added Successfully" });
        console.log(result);
    } catch (err) {
        console.log(err);
        res.render("error.ejs");
    }
};

exports.Viewcategorie = async (req, res) => {
    try {
        const cat = await LMSmodels.getViewcategorie();
        res.render("viewCategories.ejs", { cat });
    } catch (err) {
        res.render("error.ejs");
    }
}


exports.beforeUpdateCat = async (req, res) => {
    let id = parseInt(req.query.id.trim());
    console.log("cat Id ---------->" + id)
    try {
        const cat = await LMSmodels.getbeforeupdateCat(id);
        res.render("updateCategories.ejs", { cat });
    } catch (err) {
        res.render("error.ejs");
    }
}


exports.afterUpdateCat = async (req, res) => {
    try {
        const id = req.body.id.trim();
        const name = req.body.name.trim();
        console.log("ID:", id);
        console.log("Name:", name);

        await LMSmodels.getafterupdateCat(id, name);
        res.render("adminDashboard.ejs");
    } catch (err) {
        console.error("Update error:", err);
        res.render("error.ejs");
    }
};

exports.deleteCat = async (req, res) => {
    try {
        let id = req.query.id.trim();

        await LMSmodels.getdelCategory(id);
        res.render("adminDashboard.ejs");

    } catch (err) {
        console.error("Delete error:", err);
        res.render("error.ejs");
    }
}

exports.getCategories = async (req, res) => {
    try {
        const cat = await LMSmodels.getAllCategories(); // adjust as needed
        res.json(cat);
    } catch (err) {
        res.status(500).json({ error: "Failed to load categories" });
    }
}

// end categories Routers

// books routers

exports.addBookForm = async (req, res) => {

    let categories = await LMSmodels.getViewcategorie();

    res.render("addBookForm.ejs", { categories });
}

exports.addBook = async (req, res) => {
    const { title, author, publisher, isbn, category, total_copies, available_copies, status } = req.body;
    const image = '/uploads/' + req.file.filename;

    try {
        let catID = await LMSmodels.checkCategories(category);
        console.log("Category ID:", catID);

        await LMSmodels.addBook(title, author, publisher, isbn, total_copies, available_copies, status, image, catID);
        res.render("adminDashboard.ejs");

    } catch (err) {
        console.error("Add Book Error:", err);
        res.render("err.ejs");
    }
};



// exports.viewBooks = async (req, res) => {
//     try {
//         const page = parseInt(req.query.page) || 1;
//         const limit = 12;
//         const offset = (page - 1) * limit;

//         const [books, total] = await Promise.all([
//             LMSmodels.getBooks(limit, offset),
//             LMSmodels.countBooks()
//         ]);

//         const totalPages = Math.ceil(total / limit);

//         res.render('viewBooks.ejs', {
//             books,
//             currentPage: page,
//             totalPages
//         });

//     } catch (err) {
//         console.error("Pagination Error:", err);
//         res.render("error.ejs");
//     }
// };

exports.viewBooks = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 12;
        const offset = (page - 1) * limit;

        const [books, total, categories] = await Promise.all([
            LMSmodels.getBooks(limit, offset),
            LMSmodels.countBooks(),
            LMSmodels.getAllCategories() // 👈 This must exist
        ]);

        const totalPages = Math.ceil(total / limit);

        res.render('viewBooks.ejs', {
            books,
            currentPage: page,
            totalPages,
            categories
        });

    } catch (err) {
        console.error("Pagination Error:", err);
        res.render("error.ejs");
    }
};


exports.deleteBook = async (req, res) => {
  try {
    const id = req.body.id;
    if (!id || isNaN(id)) {
      return res.status(400).render("error.ejs", { message: "Invalid book ID" });
    }

    await LMSmodels.deleteBook(parseInt(id));
    res.redirect("/viewBooks");
  } catch (err) {
    console.error("Delete error:", err);
    res.render("error.ejs", { message: "An error occurred while deleting the book." });
  }
};



exports.beforeUpdateBook = async (req, res) => {
  try {
    let id = req.query.id.trim();

    const [book] = await LMSmodels.beforeUpdateBook(id);
    const categories = await LMSmodels.getAllCategories();

    if (!book) throw new Error("Book not found");

    res.render("UpdateBook.ejs", { book, categories });
  } catch (err) {
    console.error("Error in beforeUpdateBook:", err);
    res.render("error.ejs");
  }
};

exports.afterUpdateBook = async (req, res) => {
  try {
    const {
      title,
      author,
      publisher,
      isbn,
      category,
      total_copies,
      available_copies,
      status,
      id,
      oldImage
    } = req.body;

    // 🛠 Handle image upload: use old image if new one not uploaded
    const image = req.file ? "/uploads/" + req.file.filename : oldImage;

    // 📦 Call DB update method
    await LMSmodels.afterUpdateBook(
      title,
      author,
      publisher,
      isbn,
      category,
      total_copies,
      available_copies,
      status,
      image,
      id
    );

    // ✅ Redirect or render success page
    res.redirect("/viewBooks"); // Or use res.render("adminDashboard.ejs");
  } catch (err) {
    console.error("Update Book Error:", err);
    res.render("error.ejs");
  }
};


exports.searchBooks = async (req, res) => {
  const term = req.query.term || "";
  try {
    const result = await LMSmodels.searchBooks(term);
    res.json(result); // sends result to frontend
  } catch (err) {
    console.error("Search Error:", err);
    res.status(500).json([]); // Return empty array on error
  }
};


// end books routers
