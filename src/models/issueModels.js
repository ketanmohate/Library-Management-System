const conn = require("../config/db.js");

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

exports.searchIssuedBooks = (keyword) => {
  return new Promise((resolve, reject) => {
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
      WHERE 
        b.title LIKE ? OR 
        b.author LIKE ? OR 
        c.name LIKE ? OR 
        u.name LIKE ? OR 
        u.email LIKE ?
      ORDER BY i.issue_date DESC;
    `;

    const likeKeyword = `%${keyword}%`;

    conn.query(sql, [likeKeyword, likeKeyword, likeKeyword, likeKeyword, likeKeyword], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

exports.updateIssueStatus = (issue_id, newStatus) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE issue_details SET status = ? WHERE id = ?`;
    conn.query(sql, [newStatus, issue_id], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};


exports.getIssuedBooks = () => {
  return new Promise((res, rej) => {
    const sql = `
      SELECT 
        i.id AS issue_id, b.title AS book_title, u.name AS user_name, u.email, 
        i.issue_date, i.return_date, i.status
      FROM issue_details i
      JOIN books b ON i.book_id = b.id
      JOIN users u ON i.issued_by = u.id
      WHERE i.status = 'issued'
      ORDER BY i.issue_date DESC`;
    conn.query(sql, (err, result) => err ? rej(err) : res(result));
  });
};

exports.updateIssueStatus = (issue_id, status) => {
  return new Promise((res, rej) => {
    const sql = `UPDATE issue_details SET status = ? WHERE id = ?`;
    conn.query(sql, [status, issue_id], (err, result) => err ? rej(err) : res(result));
  });
};

exports.getReturnedBooks = () => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT 
        i.id AS issue_id,
        b.title AS book_title,
        b.author,
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
      WHERE i.status = 'returned'
      ORDER BY i.return_date DESC
    `;  
    conn.query(sql, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};
