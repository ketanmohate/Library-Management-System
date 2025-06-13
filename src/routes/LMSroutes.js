let routers = require("express");
let homectrl = require("../controllers/homeCtrl");

let router = routers.Router();

router.get('/',homectrl.home);

router.get("/logins",homectrl.login);
router.get("/about",homectrl.about);
router.post("/userLogin",homectrl.userLogin);

router.get("/viewAllBooks",homectrl.viewAllBooks);

router.get("/books", async (req, res) => {
  const search = req.query.search || "";
  const books = await LMSmodels.getFilteredBooks(search);
  res.render("about.ejs", { books });
});

router.get("/dashbord",homectrl.dashbord);

router.get("/viewstud",homectrl.Viewstudent);

router.get("/searchStudent",homectrl.searchStud);

router.get("/categorie",homectrl.categories);

// router.post("/addcategorie",homectrl.addcategories);
router.post('/addcategorie', homectrl.addcategories);


router.get("/deleteStudent",homectrl.deleteStud);
module.exports = router;