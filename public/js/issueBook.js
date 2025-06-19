
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

document.addEventListener("DOMContentLoaded", function () {
  const categoryInput = document.getElementById("categoryInput");
  const bookDropdown = document.getElementById("bookDropdown");

  categoryInput.addEventListener("input", async function () {
    const category = categoryInput.value;

    // Show loading
    bookDropdown.innerHTML = '<option value="">Loading books...</option>';

    try {
      const response = await fetch(`/booksByCategory?category=${encodeURIComponent(category)}`);
      const data = await response.json();

      if (data.books && data.books.length > 0) {
        bookDropdown.innerHTML = '<option value="">Select a book</option>';
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

document.addEventListener("DOMContentLoaded", function () {
  const issueDateInput = document.getElementById("issueDate");
  const returnDateInput = document.getElementById("returnDate");

  issueDateInput.addEventListener("change", function () {
    const issueDate = new Date(this.value);
    if (isNaN(issueDate)) return;

    const returnDate = new Date(issueDate);
    returnDate.setDate(issueDate.getDate() + 7);

    // Format to yyyy-mm-dd
    const year = returnDate.getFullYear();
    const month = String(returnDate.getMonth() + 1).padStart(2, "0");
    const day = String(returnDate.getDate()).padStart(2, "0");
    returnDateInput.value = `${year}-${month}-${day}`;
  });
});


