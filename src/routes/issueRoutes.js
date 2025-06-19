const express = require("express");
const router = express.Router();
const issueCtrl = require("../controllers/issueCtrl.js");

router.get("/issueBookForm", issueCtrl.loadIssueForm);

router.get("/booksByCategory", issueCtrl.getBooksByCategory);

router.post("/issueBook", issueCtrl.issueBook);

router.get("/viewIssuedBooks",issueCtrl.viewIssuedBooks);

module.exports = router;
