let routers = require("express");
let homectrl = require("../controllers/homeCtrl");
let modules = require("../models/LMSmodels");
let router = routers.Router();

router.get('/',homectrl.home);

router.get("/logins",homectrl.login);

router.get("/about",homectrl.about);

router.post("/userLogin",homectrl.userLogin);

router.post("/addStudent",homectrl.addStudent);



router.get("/dashbord",homectrl.dashbord);

// for Student
router.get("/addSudentPage",homectrl.addSudentPage);

router.get("/viewstud",homectrl.Viewstudent);

router.get("/searchStudent",homectrl.searchStud);

router.get("/deleteStudent",homectrl.deleteStud);

router.get("/beforeUpdateStud",homectrl.beforeupdateStud);

router.post("/afterUpdateStud",homectrl.afterupdateStud);

// for Categorie
router.get("/categorie",homectrl.categories);

router.post('/addcategorie', homectrl.addcategories);

router.get("/viewcategorie",homectrl.Viewcategorie);

router.get("/deleteCategores",homectrl.deleteCat);

router.get("/beforeUpdateCat",homectrl.beforeupdateCat);

router.post("/afterUpdateCat",homectrl.afterupdateCat);


// for books
router.get("/addbookpage",homectrl.addBookPage);

router.get("/viewAllBooks",homectrl.viewAllBooks);

router.post("/addbooks",homectrl.addBooks);

router.get("/books", async (req, res) => {
  const search = req.query.search || "";
  const books = await LMSmodels.getFilteredBooks(search);
  res.render("about.ejs", { books });
});

router.get("/deletebook",homectrl.deleteBook);

router.get("/beforeUpdateBook",homectrl.beforeupdateBook);

router.post("/afterUpdateBook",homectrl.afterupdateBook);
module.exports = router;