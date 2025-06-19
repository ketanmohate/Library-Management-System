const conn = require("../config/db.js");

// exports.viewAllstudents = () => new Promise((res, rej) => {
//   conn.query("SELECT id, name, email FROM users", (e, r) => e ? rej(e) : res(r));
// });

// exports.getAllCategories = () => new Promise((res, rej) => {
//   conn.query("SELECT id, name FROM categories", (e, r) => e ? rej(e) : res(r));
// });

// exports.getBooksByCategoryName = (categoryName) => new Promise((res, rej) => {
//   const sql = `
//     SELECT b.id, b.title 
//     FROM books b
//     JOIN categories c ON b.category_id = c.id
//     WHERE c.name = ?
//   `;
//   conn.query(sql, [categoryName], (e, r) => e ? rej(e) : res(r));
// });

exports.findUserByNameOrEmail = (email) => {
  return new Promise((res, rej) => {
    const sql = `SELECT id FROM users WHERE email = ? LIMIT 1`;

    conn.query(sql, [email], (err, result) => {
      if (err) {
        console.log("Query Error:", err);
        return rej(err);
      }

      if (result.length === 0) {
        return res(null); // User not found
      }

      return res(result[0]); // Return only first match (id)
    });
  });
};


exports.insertIssueDetails = ({ book_id, issued_by, issue_date, return_date, status }) => {
  return new Promise((res, rej) => {
    const sql = `INSERT INTO issue_details (book_id, issued_by, issue_date, return_date, status) VALUES (?, ?, ?, ?, ?)`;
    conn.query(sql, [book_id, issued_by, issue_date, return_date, status], (err, result) => {
      if (err) rej(err);
      else res(result);
    });
  });
};

// exports.viewIssuedBooks = (req, res) => {
//   const sql = `
//     SELECT 
//       i.id, 
//       b.title AS book_title,
//       u.name AS user_name,
//       u.email,
//       i.issue_date,
//       i.return_date,
//       i.status
//     FROM issue_details i
//     JOIN books b ON i.book_id = b.id
//     JOIN users u ON i.issued_by = u.id
//     ORDER BY i.issue_date DESC
//   `;

//   conn.query(sql, (err, result) => {
//     if (err) {
//       console.error("Error fetching issued books:", err);
//       return res.render("error");
//     }
//     res.render("viewIssuedBooks", { issuedBooks: result });
//   });
// };

exports.viewIssuedBooks = () => {
  return new Promise((res, rej) => {
    const sql = `
   SELECT 
  i.id AS issue_id,
  b.title AS book_title,
  b.author,
  b.isbn,
  c.name AS category_name,
  u.name AS user_name,
  u.email,
  i.issue_date,
  i.return_date,
  i.status
FROM issue_details i
JOIN books b ON i.book_id = b.id
JOIN users u ON i.issued_by = u.id
LEFT JOIN categories c ON b.category_id = c.id
ORDER BY i.issue_date DESC; 
  `;
    conn.query(sql, (err, result) => {
      if (err) {
        rej(err);
      } else {
        // console.log("*************************************")
        // console.log(result)
        // console.log("*************************************")
        res(result);
      }
    })
  })
}

