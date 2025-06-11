let routers = require("express");
let homectrl = require("../controllers/homeCtrl");

let router = routers.Router();

router.get('/',homectrl.home);

router.get("/logins",homectrl.login);

module.exports = router;