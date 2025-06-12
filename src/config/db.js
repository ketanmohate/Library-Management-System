let mysql = require("mysql");

let conn = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"ketan@9595",
    database:"lms"
});

conn.connect((err)=>{
    if(err){
        console.log("Some problem is there");
    }
    else{
        console.log("Database is connected");
    }
})

module.exports=conn;