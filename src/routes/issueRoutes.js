let express = require("express");
let upload = require("../middleware/multer.js");
let homectrl = require("../controllers/homeCtrl.js");
const issueCtrl = require("../controllers/issueCtrl.js");

let router = express.Router(); // ✅ FIXED

// Start Issue_book

// For issuing a book
router.get("/issueBookForm", issueCtrl.loadIssueForm);

router.get("/booksByCategory", issueCtrl.getBooksByCategory);

// router.post("/issueBook", issueCtrl.issueBook);

// For viewing issued books
// router.get("/viewIssuedBooks", issueCtrl.viewIssuedBooks);

// End Issue_book

module.exports = router; // ✅ FIXED
