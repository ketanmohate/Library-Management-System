const LMS = require("../models/LMSmodels.js");
const issueModels = require("../models/issueModels.js");

exports.loadIssueForm = async (req, res) => {
  try {
    const students = await LMS.viewAllstudents();
    const categories = await LMS.getAllCategories();

    res.render("issueBook", {
      students: Array.isArray(students) ? students : [],
      categories: Array.isArray(categories) ? categories : []
    });
  } catch (err) {
    console.error("Load Issue Form Error:", err);
    res.render("error");
  }
};

// Fetch books by category (AJAX)
exports.getBooksByCategory = async (req, res) => {
  try {
    const categoryName = req.query.category?.trim();
    if (!categoryName) return res.status(400).json({ error: "Category name is required" });

    const books = await LMS.getBooksByCategoryName(categoryName);
    res.json({ books });
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).json({ error: "Internal error" });
  }
};

// Handle book issue form submission

exports.issueBook = async (req, res) => {
  try {
    const { user, book_id, issue_date, return_date, status } = req.body;

    // Extract email from "Name (email)" format
    const match = user.match(/\(([^)]+)\)/);
    const email = match ? match[1].trim() : null;

    if (!email) return res.status(400).send("Invalid user format");

    // console.log("user email -------> " + email);

    // Get user ID
    const userResult = await issueModels.findUserByNameOrEmail(email);

    let issued_by = userResult.id;

    console.log("Book ID -------> " + book_id);
    console.log("issued_by (user id) ------->" + issued_by);
    console.log("issue_date ------->" + issue_date);
    console.log("return_date------->" + return_date);
    console.log("status------->" + status);

    if (!userResult || userResult.length === 0) {
      return res.status(400).send("User not found");
    }

    // Insert issue record
    await issueModels.insertIssueDetails({
      book_id,
      issued_by,
      issue_date,
      return_date,
      status
    });

    // res.redirect("/viewIssuedBooks");
    res.render("adminDashboard");
  } catch (err) {
    console.error("Issue book failed:", err);
    res.render("error");
  }
};


exports.viewIssuedBooks = async (req, res) => {
  try {
    // Wait for the query result
    const issuedBooks = await issueModels.viewIssuedBooks();

    // console.log("=====================================");
    // console.log(issuedBooks);
    // console.log("=====================================");

    // Pass as a named object so it can be accessed as "issuedBooks" in EJS
    res.render("viewIssuedBooks", { issuedBooks });

  } catch (err) {
    console.error("Failed to load issued books:", err);
    res.render("error");
  }
};

exports.searchIssuedBooks = async (req, res) => {
  const keyword = req.query.keyword;
  const data = await issueModels.searchIssuedBooks(keyword);
  res.json({ results: data });
};

exports.updateStatus = async (req, res) => {
  try {
    const { issue_id, status } = req.body; // from form or AJAX

    await issueModels.updateIssueStatus(issue_id, status);

    res.redirect("/viewIssuedBooks"); // or res.json({ success: true });
  } catch (err) {
    console.error("Status update failed:", err);
    res.status(500).send("Failed to update status");
  }
};


exports.returnBookPage = async (req, res) => {
  const books = await issueModels.getIssuedBooks(); // status='issued'
  res.render("returnBook", { issuedBooks: books });
};

exports.markBookReturned = async (req, res) => {
  const { issue_id } = req.body;
  await issueModels.updateIssueStatus(issue_id, "returned");
  res.redirect("/returnBookPage");
};

exports.viewReturnedBooks = async (req, res) => {
  try {
    const returnedBooks = await issueModels.getReturnedBooks();
    res.render("viewReturnedBooks", { returnedBooks });
  } catch (err) {
    console.error("Failed to load returned books:", err);
    res.render("error");
  }
};
