// Get all books based on category_id
exports.getBooksByCategory = (category_id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM books WHERE category_id = ?";
    conn.query(sql, [category_id], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};
