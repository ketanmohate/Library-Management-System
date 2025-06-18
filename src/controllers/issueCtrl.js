const LMSmodels = require("../models/LMSmodels.js");
const issueCtrl = require("../models/issueModels.js");

// exports.loadIssueForm = async (req, res) => {
//     try {
//         let students = LMSmodels.viewAllstudents();
//         let books = LMSmodels.getAllBooks();
//         let categories = LMSmodels.getAllCategories();
//         res.render("issueBook.ejs",{ students, books, categories});
//     } catch (err) {
//         console.log(err);
//         res.render("error");
//     }
// };


// exports.loadIssueForm = async (req, res) => {
//   try {
//     // const students = await LMSmodels.viewAllStudents();
//     const students = await LMSmodels.viewAllstudents;
//     const books = await LMSmodels.getAllBooks(); // Optional: can be removed if you want to load only after category is selected
//     const categories = await LMSmodels.getAllCategories();

//     res.render("issueBook.ejs", {
//       students,
//       books,
//       categories
//     });
//   } catch (err) {
//     console.error("Error loading issue form:", err);
//     res.render("error");
//   }
// };

exports.loadIssueForm = async (req, res) => {
  try {
    const students = await LMSmodels.viewAllstudents();  // should return array
    const books = await LMSmodels.getAllBooks();         // optional here
    const categories = await LMSmodels.getAllCategories();

    res.render("issueBook.ejs", {
      students: Array.isArray(students) ? students : [],  // 👈 defensive check
      books: books || [],
      categories: Array.isArray(categories) ? categories : []
    });
  } catch (err) {
    console.error("Load Issue Form Error:", err);
    res.render("error");
  }
};



// GET /booksByCategory?category=Science
exports.getBooksByCategory = async (req, res) => {
  try {
    const category_id = req.query.category;

    const books = await issueCtrl.getBooksByCategory(category_id);
    res.json({ books });
  } catch (error) {
    console.error("Error fetching books by category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

