const LMSmodels = require("../models/LMSmodels.js");
const issueCtrl = require("../models/issueModels.js");

exports.loadIssueForm = async (req, res) => {
  try {
    const students = await LMSmodels.viewAllstudents();
    const categories = await LMSmodels.getAllCategories();

    console.log("---------------------------")
    console.log(categories);

    res.render("issueBook.ejs", {
      students: Array.isArray(students) ? students : [],
      categories: Array.isArray(categories) ? categories : []
    });
  } catch (err) {
    console.error("Load Issue Form Error:", err);
    res.render("error");
  }
};

// AJAX API to get books by category name
exports.getBooksByCategory = async (req, res) => {
  try {
    const categoryName = req.query.category.trim();
    console.log("================")
    console.log(categoryName)
    if (!categoryName) {
      return res.status(400).json({ error: "Category name is required" });
    }

    const books = await LMSmodels.getBooksByCategoryName(categoryName);
    console.log("********************************")
    console.log(books[0].title);
    console.log("********************************")

    res.json({ books });
    
  } catch (error) {
    console.error("Error fetching books by category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};