document.addEventListener("DOMContentLoaded", () => {
  const bookItems = Array.from(document.querySelectorAll(".book-item"));
  const searchInput = document.getElementById("Name");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const pageIndicator = document.getElementById("pageIndicator");
  const container = document.getElementById("bookContainer");

  let itemsPerPage = 8;
  let currentPage = 1;
  let filteredBooks = [...bookItems];

  function renderPage(page, list = filteredBooks) {
    container.innerHTML = "";

    const totalPages = Math.ceil(list.length / itemsPerPage);
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = list.slice(start, end);

    if (pageItems.length === 0) {
      container.innerHTML = "<p>No books found.</p>";
      pageIndicator.textContent = "";
      prevBtn.disabled = true;
      nextBtn.disabled = true;
      return;
    }

    pageItems.forEach(book => container.appendChild(book));
    pageIndicator.textContent = `Page ${page}`;
    prevBtn.disabled = page === 1;
    nextBtn.disabled = page === totalPages;
  }

  function searchSBooks(keyword) {
    currentPage = 1;
    const query = keyword.toLowerCase();

    filteredBooks = bookItems.filter(book => {
      const title = book.querySelector(".book-title")?.textContent.toLowerCase() || "";
      const author = book.querySelector(".book-author")?.textContent.toLowerCase() || "";
      const publisher = book.querySelector(".book-publisher")?.textContent.toLowerCase() || "";
      const isbn = book.querySelector(".book-isbn")?.textContent.toLowerCase() || "";
      const category = book.querySelector(".book-category")?.textContent.toLowerCase() || "";

      return (
        title.includes(query) ||
        author.includes(query) ||
        publisher.includes(query) ||
        isbn.includes(query) ||
        category.includes(query)
      );
    });

    renderPage(currentPage);
  }

  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderPage(currentPage);
    }
  });

  nextBtn.addEventListener("click", () => {
    const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      renderPage(currentPage);
    }
  });

  searchInput.addEventListener("input", (e) => {
    searchSBooks(e.target.value);
  });

  renderPage(currentPage);
});
