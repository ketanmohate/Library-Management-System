document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".book-form");
  const globalMsg = document.getElementById("globalMsg");

  // Auto return date code (keep as-is)
  const issueDateInput = document.getElementById("issueDate");
  const returnDateInput = document.getElementById("returnDate");

  issueDateInput.addEventListener("change", function () {
    const issueDate = new Date(this.value);
    if (isNaN(issueDate)) return;

    const returnDate = new Date(issueDate);
    returnDate.setDate(issueDate.getDate() + 7);

    const year = returnDate.getFullYear();
    const month = String(returnDate.getMonth() + 1).padStart(2, "0");
    const day = String(returnDate.getDate()).padStart(2, "0");
    returnDateInput.value = `${year}-${month}-${day}`;
  });

  // Book fetching by category (keep as-is)
  const categoryInput = document.getElementById("categoryInput");
  const bookDropdown = document.getElementById("bookDropdown");

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

  // ✅ Remove success/error message on input or interaction
  if (globalMsg && form) {
    form.addEventListener("focusin", () => {
      globalMsg.textContent = "";
      globalMsg.classList.remove("success-msg", "error-msg");
    });

    form.addEventListener("submit", () => {
      globalMsg.textContent = "";
      globalMsg.classList.remove("success-msg", "error-msg");
    });
  }
});
