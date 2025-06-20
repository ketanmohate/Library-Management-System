const conn = require("../config/db.js");
let ctrlHome = require("../controllers/homeCtrl.js");
let issueCtrl = require("../controllers/issueCtrl.js");
let issueModeles = require("./issueModels.js");
let LMSmodelsModeles = require("./LMSmodels.js");

exports.getStudLogin = (username, password) => {
    return new Promise((res, rej) => {
        const sql = "SELECT email, password FROM users WHERE email = ? AND password = ?";
        conn.query(sql, [username, password], (err, result) => {
            if (err) {
                rej(err);
            } else {
                res(result);
            }
        });
    });
};

exports.getUser = (email) => {
    return new Promise((res, rej) => {
        conn.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
            if (err) {
                rej(err);
            } else {
                res(result);
            }
        });
    });
};

exports.getAllBooksUser = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
        books.*, 
        categories.name AS category_name
      FROM books
      LEFT JOIN categories ON books.category_id = categories.id
    `;
    
    conn.query(query, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};
