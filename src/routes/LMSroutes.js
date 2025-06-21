let routers = require("express");
let upload = require("../middleware/multer.js")
let homectrl = require("../controllers/homeCtrl.js");
const issueCtrl = require("../controllers/issueCtrl.js");
// const { getStudLogin } = require("../models/studLoginModels.js");

const studLoginCtrl = require("../controllers/studLoginCtrl.js");

let router = routers.Router();

router.get('/',homectrl.home);

router.get("/logins",homectrl.login);

router.get("/about",homectrl.about);

router.post("/userLogin",homectrl.userLogin);

router.get("/dashbord",homectrl.dashbord);



// Start Student

router.post("/addStudent",homectrl.addStudent);

router.get("/addSudentPage",homectrl.addSudentPage);

router.post("/addStudent",homectrl.addStudent);

router.get("/viewstud",homectrl.Viewstudent);

router.get("/searchStudent",homectrl.searchStud);

router.get("/deleteStudent", homectrl.deleteStud);

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

router.get("/viewBooks",homectrl.viewBooks);

router.post("/deleteBook", homectrl.deleteBook);

router.get("/beforeUpdateBook",homectrl.beforeUpdateBook);

router.post("/afterUpdateBook", upload.single("image"), homectrl.afterUpdateBook);

router.get("/searchBooks",homectrl.searchBooks);

// End Books


// Start User Student

router.get("/userDashboard",studLoginCtrl.userDashboard);

router.get("/userProfile",studLoginCtrl.userProfile);

router.get("/userViewBooks",studLoginCtrl.userViewBooks);

router.get("/showStudIssuedBook",studLoginCtrl.showStudIssuedBook);

router.get("/userHistory",studLoginCtrl.userHistory);

// End User Student





router.get("/deletebook",homectrl.deleteBook);

router.get("/beforeUpdateBook",homectrl.beforeupdateBook);

router.post("/afterUpdateBook",homectrl.afterupdateBook);
module.exports = router;