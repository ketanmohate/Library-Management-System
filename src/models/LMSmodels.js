let ctrl = require("../controllers/homeCtrl");
let conn = require("../config/db");

exports.getAllBooks = () => {
    return new Promise((res, rej) => {
        conn.query(
            "SELECT title, author, publisher, category, total_copies, available_copies, status, image FROM books",
            (err, result) => {
                if (err) {
                    rej(err);
                } else {
                    console.log(result);
                    res(result); 
                }
            }
        );
    });
}
 
exports.viewAllstudents = ()=>{
  return new Promise((res,rej)=>{

    conn.query("select name ,email, password, role ,created_at from users ",(err,result)=>{
      if(err){
        rej(err);
      }
      else{
        res(result);
      }
    });
  });
}

exports.searchAllStudent = (searchValue) => {
    return new Promise((res, rej) => {
        let value = '%' + searchValue + '%';
        conn.query(
            `SELECT * FROM users WHERE name LIKE ? OR email LIKE ?`,
            [value, value],
            (err, result) => {
                if (err) {
                    rej(err);
                } else {
                    res(result);
                }
            }
        );
    });
};


exports.getFilteredBooks = (search = "") => {
  return new Promise((res, rej) => {
    let sql = "SELECT * FROM books";
    if (search) {
      sql += " WHERE title LIKE ? OR author LIKE ? OR category LIKE ?";
      search = `%${search}%`;
    }

    conn.query(sql, search ? [search, search, search] : [], (err, result) => {
      if (err) rej(err);
      else res(result);
    });
  });
};
