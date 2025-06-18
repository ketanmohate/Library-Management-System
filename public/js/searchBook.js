function searchSBooks(query) {
  const container = document.getElementById("bookContainer");

  if (query.trim() === "") {
    window.location.href = "/viewBooks"; // reload original list
    return;
  }

  fetch(`/searchBooks?term=${encodeURIComponent(query)}`)
    .then(response => response.json())
    .then(data => {
      container.innerHTML = "";

      if (data.length === 0) {
        container.innerHTML = "<p style='color:white;'>No matching books found.</p>";
        return;
      }

      data.forEach(book => {
        const bookCard = `
          <div class="book-card book-item">
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
              <a href="/deleteBook?id=${book.id}" class="btn-delete">🗑️ Delete</a>
            </div>
          </div>
        `;
        container.innerHTML += bookCard;
      });

      // Hide pagination while searching (optional)
      const pagination = document.querySelector(".pagination");
      if (pagination) pagination.style.display = "none";
    })
    .catch(err => {
      console.error("Search error:", err);
    });
}
