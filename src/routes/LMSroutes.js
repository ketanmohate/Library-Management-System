let routers = require("express");
let homectrl = require("../controllers/homeCtrl");

let router = routers.Router();

router.get('/',homectrl.home);

router.get("/logins",homectrl.login);
router.get("/about",homectrl.about);

module.exports = router;