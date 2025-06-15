let ctrl = require("../controllers/homeCtrl");
let conn = require("../config/db");

exports.getaddBooks = (title, author, publisher, isbn, category, total_copies, available_copies, status, image,created_at) => {
    return new Promise((res, rej) => {
      const bookDetail = "INSERT INTO books (title, author, publisher, isbn, category, total_copies, available_copies, status, image) values (?, ?, ?, ?, ?, ?, ?, ?, ?)";
      conn.query(bookDetail,[title, author, publisher, isbn, category, total_copies, available_copies, status, image], (err, result) => {
        if(err){
          rej(err);
        }
        else{
          res(result);
        }
      });

    });
}

exports.getAllBooks = () => {
    return new Promise((res, rej) => {
        conn.query(
            "SELECT id, title, author, publisher, category, total_copies, available_copies, status, image FROM books",
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

exports.getDeleteBook= (id) => {
  return new Promise((resolve, reject) => {
        conn.query("DELETE FROM books WHERE id = ?", [id], (err, result) => {
           
             conn.query("SELECT * FROM books", (err, result) => {
                if (err) {
                    return reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    });
}
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
    return new Promise((res, rej) => {
        conn.query("SELECT id, name, email, password, created_at FROM users", (err, result) => {
            if (err) {
                rej(err);
            } else {
                res(result);
            }
        });
    });
}

exports.getViewcategorie = () =>{
  return new Promise((res, rej) => {
    conn.query("select id, name from categories",(err, result) => {
      if(err){
        rej(err);
      } else {
        res(result);
      }
    })
  })
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
        conn.query("select id, name,email, password from users where id = ?",[id],(err, result) => {
          if(err){
            reject(err);
          } else{
            resolve(result);
          }
        });
      });
}

exports.getafterupdateStud = (name , email , password, id) => {
  return new Promise((res, rej) => {
        
        conn.query("update users set name=?,email=? , password=? where id=? ", [ name , email , password, id], (err, result) => {
            if (err) {
                rej(err);
            } else {
                res(result);
            }
        })
    })
}
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



exports.getaddcategories = (str) => {
    return new Promise((resolve, reject) => {

        conn.query("insert into categories (name)values (?)", [str], (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        })
    });
};

exports.getdelCategorie = (id) => {
  return new Promise((resolve, reject) => {
    conn.query("DELETE FROM categories WHERE id = ?",[id],(err,result) => {
      
      conn.query("select * from categories",(err, result) => {
      if(err){
       return  reject(err);
      } else {
        resolve(result);
      }
        });
    });
  });
  
}


exports.getbeforeupdateCat =  (id) =>{
 return new Promise((res, rej) => {
 
    conn.query("select * from categories where id = ?",[id],(err, result) => {
      if(err){
        rej(err);
      } else {
        res(result);
      }
    });
  });
}

exports.getafterupdateCat = (name,id) =>{
   return new Promise((res, rej) => {
 
        conn.query("update categories set name=? where id=? ", [ name , id], (err, result) => {
            if (err) {
                rej(err);
            } else {
                res(result);
            }
        });
      });
}