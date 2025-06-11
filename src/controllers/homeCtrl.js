exports.home = ((req, res)=>{
    res.render("home.ejs");
})

exports.login = ((req, res)=>{
    res.render("Login.ejs");
})

exports.about = ((req, res)=>{
    res.render("about.ejs");
})