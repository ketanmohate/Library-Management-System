let ctrl = require("../controllers/homeCtrl.js");
let conn = require("../config/db");


// Start student Models

exports.addStudent = (name, email, password) => {
  return new Promise((res, rej) => {
    const sql = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'member')";
    conn.query(sql, [name, email, password], (err, result) => {
      if (err) {
        rej(err);
      } else {
        res(result);
      }
    })
  })
};

exports.viewAllstudents = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT id, name, email, password, created_at FROM users";
    conn.query(sql, (err, result) => {
      if (err) return reject(err);
      resolve(result); // ✅ result is an array
    });
  });
};


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

exports.getStudentDelete = (id) => {
  return new Promise((resolve, reject) => {
    conn.query("DELETE FROM users WHERE id = ?", [id], (err, result) => {
      if (err) {
        return reject(err);
      }
      conn.query("SELECT * FROM users", (err1, result1) => {
        if (err1) {
          return reject(err1);
        }
        else {
          resolve(result1);
        }
      });
    });
  });
};

exports.getbeforeupdateStud = (id) => {
  return new Promise((resolve, reject) => {
    conn.query("select id, name,email, password from users where id = ?", [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

exports.getafterupdateStud = (name, email, password, id) => {
  return new Promise((res, rej) => {

    conn.query("update users set name=?,email=? , password=? where id=? ", [name, email, password, id], (err, result) => {
      if (err) {
        rej(err);
      } else {
        res(result);
      }
    })
  })
}

// End student Models




// Start Category Models

exports.getViewcategorie = () => {
  return new Promise((res, rej) => {
    conn.query("select id, name from categories", (err, result) => {
      if (err) {
        rej(err);
      } else {
        res(result);
      }
    })
  })
}

exports.getaddcategories = (str) => {
  return new Promise((resolve, reject) => {

    conn.query("insert into categories (name) values (?)", [str], (err, result) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(result);
      }
    })
  });
};


exports.getdelCategory = (id) => {
  return new Promise((resolve, reject) => {
    conn.query("DELETE FROM categories WHERE id = ?", [id], (err, result) => {
    });
    conn.query("select * from categories", (err1, result1) => {
      if (err1) {
        return reject(err1);
      } else {
        resolve(result1);
      }

    });
  });
}


exports.getbeforeupdateCat = (id) => {
  return new Promise((res, rej) => {
    conn.query("select id, name from categories where id = ?", [id], (err, result) => {
      if (err) {
        rej(err);
      } else {
        res(result);
      }
    })
  })
}

exports.getafterupdateCat = (id, name) => {
  return new Promise((res, rej) => {
    conn.query("UPDATE categories SET name = ? WHERE id = ?", [name, id], (err, result) => {
      if (err) {
        rej(err);
      } else {
        res(result);
      }
    });
  });
};

exports.getAllCategories = () => {
  return new Promise((resolve, reject) => {
    conn.query("SELECT * FROM categories", (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};



exports.checkCategories = (category) => {
  return new Promise((res, rej) => {
    conn.query(
      "SELECT id FROM categories WHERE name = ?",
      [category],
      (err, result) => {
        if (err) {
          rej(err);
        } else {
          // If category exists, return its ID
          if (result.length > 0) res(result[0].id);
          else rej("Category not found");
        }
      }
    );
  });
};


// End Category Models




// start Books Models
exports.addBook = (title, author, publisher, isbn, total_copies, available_copies, status, image, category_id) => {
  return new Promise((resolve, reject) => {
    conn.query(
      "INSERT INTO books (title, author, publisher, isbn, total_copies, available_copies, status, image, category_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [title, author, publisher, isbn, total_copies, available_copies, status, image, category_id],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

exports.getAllBooks = () => {
  return new Promise((res, rej) => {
    conn.query(
      "SELECT * FROM books",
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

exports.deleteBook = (id) => {
  return new Promise((resolve, reject) => {
    conn.query(
      "DELETE FROM books WHERE id = ?",
      [id],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};


exports.beforeUpdateBook = (id) => {
  return new Promise((res, rej) => {
    conn.query(
      `SELECT b.*, c.name AS category_name
       FROM books b
       LEFT JOIN categories c ON b.category_id = c.id
       WHERE b.id = ?`,
      [id],
      (err, result) => {
        if (err) rej(err);
        else res(result);
      }
    );
  });
};






exports.getFilteredBooks = (search = "") => {
  return new Promise((res, rej) => {
    const sql = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'member')";
    conn.query(sql, [name, email, password], (err, result) => {
      if (err) {
        rej(err);
      } else {
        res(result);
      }
    });
  });
};

exports.afterUpdateBook = (
  title,
  author,
  publisher,
  isbn,
  category,
  total_copies,
  available_copies,
  status,
  image,
  id
) => {
  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE books 
      SET title = ?, author = ?, publisher = ?, isbn = ?, category_id = ?, 
          total_copies = ?, available_copies = ?, status = ?, image = ?
      WHERE id = ?`;

    conn.query(
      sql,
      [
        title,
        author,
        publisher,
        isbn,
        category, // this should be category_id
        total_copies,
        available_copies,
        status,
        image,
        id
      ],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};


exports.getBooks = (limit, offset) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT b.*, c.name AS category_name
      FROM books b
      LEFT JOIN categories c ON b.category_id = c.id
      LIMIT ? OFFSET ?
    `;

    conn.query(query, [limit, offset], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};


// Count total books
exports.countBooks = () => {
  return new Promise((resolve, reject) => {
    conn.query('SELECT COUNT(*) AS total FROM books', (err, result) => {
      if (err) reject(err);
      else resolve(result[0].total);
    });
  });
};


exports.searchBooks = (term) => {
  return new Promise((resolve, reject) => {
    const searchTerm = `%${term}%`;

    const sql = `
      SELECT b.*, c.name AS category 
      FROM books b 
      LEFT JOIN categories c ON b.category_id = c.id
      WHERE b.title LIKE ? 
         OR b.author LIKE ? 
         OR b.publisher LIKE ? 
         OR c.name LIKE ?`;

    conn.query(sql, [searchTerm, searchTerm, searchTerm, searchTerm], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

exports.getBooksByCategoryName = (categoryName) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT b.* FROM books b
      JOIN categories c ON b.category_id = c.id
      WHERE LOWER(c.name) = LOWER(?)
    `;
    conn.query(sql, [categoryName], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};





// exports.getFilteredBooks = (search = "") => {
//     return new Promise((res, rej) => {
//         let sql = "SELECT * FROM books";
//         if (search) {
//             sql += " WHERE title LIKE ? OR author LIKE ? OR category LIKE ?";
//             search = `%${search}%`;
//         }

//         conn.query(sql, search ? [search, search, search] : [], (err, result) => {
//             if (err) rej(err);
//             else res(result);
//         });
//     });
// };

// End Books Models