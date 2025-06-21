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

exports.getUserId = (email) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT id FROM users WHERE email = ?`;
    conn.query(query, [email], (err, result) => {
      if (err) return reject(err);
      if (result.length > 0) {
        resolve(result[0].id); // ✅ Return only the user ID
      } else {
        resolve(null); // If no user found
      }
    });
  });
};


exports.showStudIssuedBook = (userId) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT 
  b.title AS bookName,
  b.author AS authorName,
  c.name AS categoryName,
  i.issue_date,
  i.return_date,
  i.status
FROM 
  issue_details i
JOIN books b ON i.book_id = b.id
JOIN categories c ON b.category_id = c.id
WHERE 
  i.status = 'issued'
  AND i.issued_by = ?`;
    conn.query(query, [userId], (err, result) => {
      if (err) {
        reject(err)
      }
      else {
        resolve(result);
        console.log(result);
      }
    });
  });
}

exports.userHistory = (userId)=>{
  return new Promise((resolve, reject) => {
    const query = `SELECT 
  b.title AS bookName,
  b.author AS authorName,
  c.name AS categoryName,
  i.issue_date,
  i.return_date,
  i.status
FROM 
  issue_details i
JOIN books b ON i.book_id = b.id
JOIN categories c ON b.category_id = c.id
WHERE 
  i.status = 'returned'
  AND i.issued_by = ?`;
    conn.query(query, [userId], (err, result) => {
      if (err) {
        reject(err)
      }
      else {
        resolve(result);
        console.log(result);
      }
    });
  });
}