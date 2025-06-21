const { Router } = require("express");
const LMSmodels = require("../models/LMSmodels.js");
const router = require("../routes/LMSroutes");
const studLoginModels = require("../models/studLoginModels.js");
exports.home = ((req, res) => {
    res.render("home.ejs");
})

exports.login = ((req, res) => {
    res.render("Login.ejs", { msg: "" });
})

exports.about = ((req, res) => {
    res.render("about.ejs");

})

// exports.userLogin = async (req, res) => {
//     const { username, password } = req.body;
//     const usernameT = username.trim();
//     const passwordT = password.trim();

//     // Admin login
//     if (usernameT === "admin" && passwordT === "admin@123") {
//         return res.render("adminDashboard.ejs", {
//             msg: "Select a section from the sidebar to manage Students, Categories, or Books."
//         });
//     }

//     try {
//         const user = await studLoginModels.getStudLogin(usernameT, passwordT);

//         if (user.length > 0) {
//             return res.render("userDashboard.ejs", { msg: `Welcome, ${user[0].email}` });
//         } else {
//             return res.render("Login.ejs", { msg: "Username or password is invalid" });
//         }
//     } catch (err) {
//         console.error("Login error:", err);
//         return res.render("Login.ejs", { msg: "An error occurred during login" });
//     }
// };

// exports.userLogin = async (req, res) => {
//     const { username, password } = req.body;
//     const usernameT = username.trim();
//     const passwordT = password.trim();

//     // Admin login
//     if (usernameT === "admin" && passwordT === "admin@123") {
//         req.session.user = { username: "admin", role: "admin" }; // Admin session
//         return res.render("adminDashboard.ejs", {
//             msg: "Select a section from the sidebar to manage Students, Categories, or Books."
//         });
//     }

//     try {
//         const user = await studLoginModels.getStudLogin(usernameT, passwordT);

//         if (user.length > 0) {
//             req.session.user = {
//                 id: user[0].id,
//                 email: user[0].email,
//                 role: "student"
//             };

//             console.log("Session:", req.session.user);

//             return res.render("userDashboard.ejs", { msg: `Welcome, ${user[0].email}` });
//         } else {
//             return res.render("Login.ejs", { msg: "Username or password is invalid" });
//         }
//     } catch (err) {
//         console.error("Login error:", err);
//         return res.render("Login.ejs", { msg: "An error occurred during login" });
//     }
// };


exports.userLogin = async (req, res) => {
    const { username, password } = req.body;
    const usernameT = username.trim();
    const passwordT = password.trim();

    // Admin login
    if (usernameT === "admin" && passwordT === "admin@123") {
        req.session.user = { username: "admin", role: "admin" };
        return res.render("adminDashboard.ejs", {
            msg: "Select a section from the sidebar to manage Students, Categories, or Books."
        });
    }

    try {
        const user = await studLoginModels.getStudLogin(usernameT, passwordT);

        if (user.length > 0) {
            // ✅ Create session with email
            req.session.user = {
                email: user[0].email,
                role: "student"
            };

            console.log("Session Created:", req.session.user); // debug

            return res.render("userDashboard.ejs", { msg: `Welcome, ${user[0].email}` });
        } else {
            return res.render("Login.ejs", { msg: "Username or password is invalid" });
        }

    } catch (err) {
        console.error("Login error:", err);
        return res.render("Login.ejs", { msg: "An error occurred during login" });
    }
};




exports.dashbord = ((req, res) => {
    res.render("adminDashboard.ejs", { msg: "" });
})





// students routers

exports.addSudentPage = ((req, res) => {
    // console.log("Hello");
    res.render("addStudentForm.ejs", { msg: "" });
});

exports.addStudent = async (req, res) => {
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
    try {

        let result = await LMSmodels.addStudent(name, email, password);
        res.render("addStudentForm.ejs", { msg: "Registration Successfully", status: "success" });

    } catch (err) {
        console.log(err);
        res.render("addStudentForm.ejs", { msg: "Registration Failed! User Already Registered", status: "error" });
    }

};

exports.Viewstudent = async (req, res) => {

    try {
        const stud = await LMSmodels.viewAllstudents();
        // console.log(stud);
        res.render("viewStudent.ejs", { stud });
    }
    catch (err) {
        console.log(err);
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

exports.beforeupdateStud = async (req, res) => {
    let id = parseInt(req.query.id.trim());
    console.log("update " + id);
    try {
        const stud = await LMSmodels.getbeforeupdateStud(id);
        console.log(stud);
        res.render("updateStudent.ejs", { stud, msg: "", status: "" });
    }
    catch (err) {
        console.log(err);
        res.render("updateStudent.ejs", { stud, msg: "", status: "" });
    }

}

exports.afterupdateStud = async (req, res) => {
    const {
        student_id,
        student_name,
        student_email,
        student_password,
        confirm_password,
    } = req.body;

    const id = student_id;
    const name = student_name.trim();
    const email = student_email.trim();
    const password = student_password.trim();
    const confirm_pass = confirm_password.trim();

    let msg = "";
    let status = "";

    try {
        // Optional: check if passwords match (add this if not handled on frontend)
        if (password !== confirm_pass) {
            const stud = await LMSmodels.getbeforeupdateStud(id);
            return res.render("updateStudent.ejs", {
                stud,
                msg: "Passwords do not match.",
                status: "error"
            });
        }

        await LMSmodels.getafterupdateStud(name, email, password, id);

        // ✅ Get updated data to show
        const stud = await LMSmodels.getbeforeupdateStud(id);

        res.render("updateStudent.ejs", {
            stud,
            msg: "Updated Successfully",
            status: "success"
        });
    } catch (err) {
        console.log("Update Error:", err);

        try {
            const stud = await LMSmodels.getbeforeupdateStud(id);
            res.render("updateStudent.ejs", {
                stud,
                msg: "Update Failed",
                status: "error"
            });
        } catch (nestedErr) {
            console.log("Nested Error:", nestedErr);
            res.render("error.ejs"); // fallback page
        }
    }
};

exports.deleteStud = async (req, res) => {
    try {
        const id = parseInt(req.query.id.trim());

        if (!id || isNaN(id)) {
            console.log("Invalid ID");
            return res.redirect("/viewstud");
        }

        await LMSmodels.getStudentDelete(id); // perform delete
        return res.redirect("/viewstud");     // then reload list
    } catch (err) {
        console.error("Error in deleteStud:", err);
        return res.redirect("/viewstud");
    }
};




// end student routers


// categories Routers

exports.categories = ((req, res) => {
    res.render("addCategories.ejs", { msg: null, status: null });
})

exports.addcategories = async (req, res) => {
    try {
        const name = req.body.name.trim();

        console.log(name);

        const result = await LMSmodels.getaddcategories(name);

        res.render("addCategories.ejs", { msg: "Category Added Successfully", status: "success" });

        // console.log(result);

    } catch (err) {
        console.log(err);
        res.render("addCategories.ejs", { msg: "Category could not be added.", status: "error" });
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
    try {
        const cat = await LMSmodels.getbeforeupdateCat(id);
        res.render("updateCategories.ejs", { cat, msg: "", status: "" });
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

        const cat = await LMSmodels.getbeforeupdateCat(id);
        res.render("updateCategories.ejs", { cat, msg: "Updated Successfully", status: "success" });

    } catch (err) {
        console.error("Update error:", err);
        const cat = await LMSmodels.getbeforeupdateCat(id);
        res.render("updateCategories.ejs", { cat, msg: "Update Failed", status: "error" });
    }
};

exports.deleteCat = async (req, res) => {
    try {
        let id = req.query.id.trim();

        if (!id || isNaN(id)) {
            console.log("Invalid ID");
            return res.redirect("/viewcategorie");
        }

        await LMSmodels.getdelCategory(id);
        return res.redirect("/viewcategorie");

    } catch (err) {
        console.error("Error in deleteStud:", err);
        return res.redirect("/viewcategorie");
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

    res.render("addBookForm.ejs", { categories, msg: "", status: "" });
}

exports.addBook = async (req, res) => {
    const { title, author, publisher, isbn, category, total_copies, available_copies, status } = req.body;
    const image = '/uploads/' + req.file.filename;

    try {
        let catID = await LMSmodels.checkCategories(category);
        console.log("Category ID:", catID);

        await LMSmodels.addBook(title, author, publisher, isbn, total_copies, available_copies, status, image, catID);

        let categories = await LMSmodels.getViewcategorie();

        res.render("addBookForm.ejs", { categories, msg: "Book added successfully", status: "success" });

    } catch (err) {

        let categories = await LMSmodels.getViewcategorie();
        console.error("Add Book Error:", err);
        res.render("addBookForm.ejs", { categories, msg: "Failed! Book was not added.", status: "error" });
    }
};


exports.viewBooks = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 8;
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


// exports.deleteBook = async (req, res) => {
//     try {
//         const id = req.body.id;
//         if (!id || isNaN(id)) {
//             return res.status(400).render("error.ejs", { message: "Invalid book ID" });
//         }

//         console.log("========================================")
//         console.log(id);
//         console.log("========================================")

//         await LMSmodels.deleteBook(id);
//         res.redirect("/viewBooks");
//     } catch (err) {
//         console.error("Delete error:", err);
//         res.render("error.ejs", { message: "An error occurred while deleting the book." });
//     }
// };

exports.deleteBook = async (req, res) => {
    try {
        const id = req.body.id;

        if (!id || isNaN(id)) {
            return res.status(400).render("error.ejs", { message: "Invalid book ID" });
        }

        await LMSmodels.deleteBook(id);
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

        res.render("UpdateBook.ejs", { book, categories, msg: "", status: "" });
    } catch (err) {
        console.error("Error in beforeUpdateBook:", err);
        res.render("error.ejs");
    }
};

exports.afterUpdateBook = async (req, res) => {
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
    try {

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

        const [book] = await LMSmodels.beforeUpdateBook(id);
        const categories = await LMSmodels.getAllCategories();

        res.render("UpdateBook.ejs", { book, categories, msg: "Updated Successfully", status: "success" });

    } catch (err) {
        console.error("Update Book Error:", err);
        const [book] = await LMSmodels.beforeUpdateBook(id);
        const categories = await LMSmodels.getAllCategories();

        res.render("UpdateBook.ejs", { book, categories, msg: "Update Failed", status: "error" });
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
