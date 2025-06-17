let routers = require("express");
let upload = require("../middleware/multer.js")
let homectrl = require("../controllers/homeCtrl.js");

let router = routers.Router();

router.get('/',homectrl.home);

router.get("/logins",homectrl.login);

router.get("/about",homectrl.about);

router.post("/userLogin",homectrl.userLogin);

router.get("/dashbord",homectrl.dashbord);



// Start Student

router.post("/addStudent",homectrl.addStudent);

router.get("/addSudentPage",homectrl.addSudentPage);

router.get("/viewstud",homectrl.Viewstudent);

router.get("/searchStudent",homectrl.searchStud);

router.get("/deleteStudent",homectrl.deleteStud);

router.get("/beforeUpdateStud",homectrl.beforeupdateStud);

router.post("/afterUpdateStud",homectrl.afterupdateStud);

// End studet




// Start Categorie
router.get("/categorie",homectrl.categories);

router.post('/addcategorie', homectrl.addcategories);

router.get('/viewcategorie',homectrl.Viewcategorie);

router.get("/beforeUpdateCat",homectrl.beforeUpdateCat);

router.post("/afterUpdateCat",homectrl.afterUpdateCat);

router.get("/deleteCategores",homectrl.deleteCat);

router.get("/getCategories",homectrl.getCategories);

// End Categorie



// Start Books

router.get("/addBookForm",homectrl.addBookForm);

router.post("/addBook", upload.single("image"), homectrl.addBook);

router.get("/viewBooks",homectrl.viewAllBooks);

router.get("/deleteBook", homectrl.deleteBook);

router.get("/beforeUpdateBook",homectrl.beforeUpdateBook);



// for books
// router.get("/books", async (req, res) => {
//   const search = req.query.search || "";
//   const books = await LMSmodels.getFilteredBooks(search);
//   res.render("about.ejs", { books });
// });

// router.get('/register-form', (req, res) => {
//   res.render('registerForm'); // renders views/registerForm.ejs
// });


// End Books



module.exports = router;