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

  // Remove global message on any input or button interaction
  const globalMsg = document.getElementById("globalMsg");
  if (globalMsg) {
    const inputs = document.querySelectorAll("input, select, textarea");
    inputs.forEach(input => {
      input.addEventListener("input", () => {
        globalMsg.textContent = "";
        globalMsg.classList.remove("success-msg", "error-msg");
      });
    });

    const buttons = document.querySelectorAll("button");
    buttons.forEach(button => {
      button.addEventListener("click", () => {
        globalMsg.textContent = "";
        globalMsg.classList.remove("success-msg", "error-msg");
      });
    });
  }
});
