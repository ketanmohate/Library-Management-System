
// document.addEventListener("DOMContentLoaded", function () {
//   const categoryInput = document.getElementById("categoryInput");
//   const bookDropdown = document.getElementById("bookDropdown");

//   categoryInput.addEventListener("input", async function () {
//     const category = this.value;
//     bookDropdown.innerHTML = '<option value="">Loading books...</option>';

//     try {
//       const response = await fetch(`/booksByCategory?category=${encodeURIComponent(category)}`);
//       const data = await response.json();

//       if (data.books && data.books.length > 0) {
//         bookDropdown.innerHTML = '<option value="">Select a book</option>';
//         data.books.forEach(book => {
//           const option = document.createElement("option");
//           // option.value = book.title;
//           option.value = book.id;
//           option.textContent = book.id;
//           bookDropdown.appendChild(option);
//         });
//       } else {
//         bookDropdown.innerHTML = '<option value="">No books found</option>';
//       }
//     } catch (error) {
//       console.error("Error fetching books:", error);
//       bookDropdown.innerHTML = '<option value="">Error loading books</option>';
//     }
//   });
// });

// document.getElementById("issueDate").addEventListener("change", function () {
//   const issueDateInput = this.value;
//   const returnDateInput = document.getElementById("returnDate");

//   if (issueDateInput) {
//     const issueDate = new Date(issueDateInput);
//     issueDate.setDate(issueDate.getDate() + 7); // Add 7 days

//     // Format date as YYYY-MM-DD for input field
//     const yyyy = issueDate.getFullYear();
//     const mm = String(issueDate.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
//     const dd = String(issueDate.getDate()).padStart(2, '0');

//     const formattedReturnDate = `${yyyy}-${mm}-${dd}`;
//     returnDateInput.value = formattedReturnDate;
//   }
// });

// document.addEventListener("DOMContentLoaded", function () {
//   const categoryInput = document.getElementById("categoryInput");
//   const bookDropdown = document.getElementById("bookDropdown");

//   categoryInput.addEventListener("input", async function () {
//     const category = categoryInput.value;

//     // Show loading
//     bookDropdown.innerHTML = '<option value="">Loading books...</option>';

//     try {
//       const response = await fetch(`/booksByCategory?category=${encodeURIComponent(category)}`);
//       const data = await response.json();

//       if (data.books && data.books.length > 0) {
//         bookDropdown.innerHTML = '<option value="">Select a book</option>';
//         data.books.forEach(book => {
//           const option = document.createElement("option");
//           option.value = book.id;
//           option.textContent = book.title;
//           bookDropdown.appendChild(option);
//         });
//       } else {
//         bookDropdown.innerHTML = '<option value="">No books found</option>';
//       }
//     } catch (error) {
//       console.error("Error fetching books:", error);
//       bookDropdown.innerHTML = '<option value="">Error loading books</option>';
//     }
//   });
// });

// document.addEventListener("DOMContentLoaded", function () {
//   const issueDateInput = document.getElementById("issueDate");
//   const returnDateInput = document.getElementById("returnDate");

//   issueDateInput.addEventListener("change", function () {
//     const issueDate = new Date(this.value);
//     if (isNaN(issueDate)) return;

//     const returnDate = new Date(issueDate);
//     returnDate.setDate(issueDate.getDate() + 7);

//     // Format to yyyy-mm-dd
//     const year = returnDate.getFullYear();
//     const month = String(returnDate.getMonth() + 1).padStart(2, "0");
//     const day = String(returnDate.getDate()).padStart(2, "0");
//     returnDateInput.value = `${year}-${month}-${day}`;
//   });
// });

// document.addEventListener("DOMContentLoaded", function () {
//   const input = document.getElementById("categoryInput");
//   const container = document.getElementById("bookContainer");

//   input.addEventListener("input", function () {
//     const term = input.value.trim();

//     if (term === "") {
//       window.location.href = ""; // or reset category view
//       return;
//     }

//     fetch(`/searchCategoryBooks?term=${encodeURIComponent(term)}`)
//       .then(res => res.json())
//       .then(data => {
//         container.innerHTML = "";

//         if (!data.books || data.books.length === 0) {
//           container.innerHTML = "<p style='color:white;'>No books found in this category.</p>";
//           return;
//         }

//         data.books.forEach(book => {
//           const bookCard = document.createElement("div");
//           bookCard.className = "book-card book-item";
//           bookCard.innerHTML = `
//             <img src="${book.image}" alt="Book Image" />
//             <div class="book-details">
//               <div class="book-title">${book.title}</div>
//               <div class="book-description">
//                 <strong>Author:</strong> ${book.author}<br />
//                 <strong>Publisher:</strong> ${book.publisher}<br />
//                 <strong>ISBN:</strong> ${book.isbn}<br />
//                 <strong>Category:</strong> ${book.category}<br />
//                 <strong>Total Copies:</strong> ${book.total_copies}<br />
//                 <strong>Available Copies:</strong> ${book.available_copies}<br />
//                 <strong>Status:</strong> ${book.status}
//               </div>
//             </div>
//           `;
//           container.appendChild(bookCard);
//         });

//         const pagination = document.querySelector(".pagination");
//         if (pagination) pagination.style.display = "none";
//       })
//       .catch(err => {
//         console.error("Search error:", err);
//       });
//   });
// });


document.addEventListener("DOMContentLoaded", function () {
  const issueDateInput = document.getElementById("issueDate");
  const returnDateInput = document.getElementById("returnDate");
  const categoryInput = document.getElementById("categoryInput");
  const bookDropdown = document.getElementById("bookDropdown");

  // Auto-calculate return date when issue date changes
  issueDateInput.addEventListener("change", function () {
    const issueDate = new Date(this.value);
    if (isNaN(issueDate)) return;

    const returnDate = new Date(issueDate);
    returnDate.setDate(issueDate.getDate() + 7); // 7 days after issue

    // Format: yyyy-mm-dd
    const year = returnDate.getFullYear();
    const month = String(returnDate.getMonth() + 1).padStart(2, "0");
    const day = String(returnDate.getDate()).padStart(2, "0");
    returnDateInput.value = `${year}-${month}-${day}`;
  });

  // Populate books based on selected category
  categoryInput.addEventListener("change", async function () {
    const selectedCategory = categoryInput.value;

    bookDropdown.innerHTML = '<option value="">Loading books...</option>';

    if (!selectedCategory) {
      bookDropdown.innerHTML = '<option value="">--Select Book--</option>';
      return;
    }

    try {
      const response = await fetch(`/booksByCategory?category=${encodeURIComponent(selectedCategory)}`);
      const data = await response.json();

      if (data.books && data.books.length > 0) {
        bookDropdown.innerHTML = '<option value="">--Select Book--</option>';
        data.books.forEach(book => {
          const option = document.createElement("option");
          option.value = book.id;
          option.textContent = book.title;
          bookDropdown.appendChild(option);
        });
      } else {
        bookDropdown.innerHTML = '<option value="">No books found</option>';
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      bookDropdown.innerHTML = '<option value="">Error loading books</option>';
    }
  });
  
});

