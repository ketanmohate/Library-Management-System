const express = require("express");
const router = express.Router();
const issueCtrl = require("../controllers/issueCtrl.js");

router.get("/issueBookForm", issueCtrl.loadIssueForm);

router.get("/booksByCategory", issueCtrl.getBooksByCategory);

router.post("/issueBook", issueCtrl.issueBook);

router.get("/viewIssuedBooks",issueCtrl.viewIssuedBooks);

router.get("/searchIssuedBooks", issueCtrl.searchIssuedBooks);

router.post("/updateIssueStatus", issueCtrl.updateStatus);

router.get("/returnBookPage", issueCtrl.returnBookPage);

router.post("/markReturned", issueCtrl.markBookReturned);

router.get("/viewReturnedBooks", issueCtrl.viewReturnedBooks);


module.exports = router;
