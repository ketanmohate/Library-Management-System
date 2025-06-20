let searchResults = [];
let currentSearchPage = 1;
const itemsPerPage = 8;

function renderSearchPage(page) {
  const container = document.getElementById("bookContainer");
  container.innerHTML = "";

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const currentItems = searchResults.slice(start, end);

  if (currentItems.length === 0) {
    container.innerHTML = "<p style='color:white;'>No matching books found.</p>";
    return;
  }

  currentItems.forEach(book => {
    const bookCard = document.createElement("div");
    bookCard.className = "book-card book-item";
    bookCard.innerHTML = `
      <img src="${book.image}" alt="Book Image" />
      <div class="book-details">
        <div class="book-title">${book.title}</div>
        <div class="book-description">
          <strong>Author:</strong> ${book.author}<br />
          <strong>Publisher:</strong> ${book.publisher}<br />
          <strong>ISBN:</strong> ${book.isbn}<br />
          <strong>Category:</strong> ${book.category}<br />
          <strong>Total Copies:</strong> ${book.total_copies}<br />
          <strong>Available Copies:</strong> ${book.available_copies}<br />
          <strong>Status:</strong> ${book.status}
        </div>
      </div>
      <div class="book-buttons">
        <a href="/beforeUpdateBook?id=${book.id}" class="btn-update">✏️ Update</a>
        <form action="/deleteBook" method="POST" onsubmit="return confirm('Are you sure?');" style="width: 100%;">
          <input type="hidden" name="id" value="${book.id}">
          <button type="submit" class="btn-delete">🗑️ Delete</button>
        </form>
      </div>
    `;
    container.appendChild(bookCard);
  });

  renderSearchPagination();
}

function renderSearchPagination() {
  const pagination = document.querySelector(".pagination");
  pagination.innerHTML = "";

  const totalPages = Math.ceil(searchResults.length / itemsPerPage);

  if (totalPages <= 1) return;

  if (currentSearchPage > 1) {
    const prevBtn = document.createElement("a");
    prevBtn.textContent = "⬅️ Previous";
    prevBtn.href = "#";
    prevBtn.onclick = (e) => {
      e.preventDefault();
      currentSearchPage--;
      renderSearchPage(currentSearchPage);
    };
    pagination.appendChild(prevBtn);
  }

  if (currentSearchPage < totalPages) {
    const nextBtn = document.createElement("a");
    nextBtn.textContent = "Next ➡️";
    nextBtn.href = "#";
    nextBtn.onclick = (e) => {
      e.preventDefault();
      currentSearchPage++;
      renderSearchPage(currentSearchPage);
    };
    pagination.appendChild(nextBtn);
  }

  pagination.style.display = "flex";
}

function searchSBooks(query) {
  if (query.trim() === "") {
    window.location.href = "/viewBooks";
    return;
  }

  fetch(`/searchBooks?term=${encodeURIComponent(query)}`)
    .then(response => response.json())
    .then(data => {
      searchResults = data;
      currentSearchPage = 1;
      renderSearchPage(currentSearchPage);
    })
    .catch(err => {
      console.error("Search error:", err);
    });
}
