document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const tableBody = document.getElementById("tableBody");
  const allRows = Array.from(tableBody.querySelectorAll("tr"));
  const rowsPerPage = 5;
  let currentPage = 1;
  let filteredRows = [...allRows];

  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const pageInfo = document.getElementById("pageInfo");

  // Function to render only required rows
  function displayRows() {
    // Hide all rows
    allRows.forEach(row => (row.style.display = "none"));

    // Get current page's slice of filtered rows
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const rowsToShow = filteredRows.slice(start, end);

    rowsToShow.forEach(row => (row.style.display = ""));

    updatePaginationControls();
  }

  // Update Prev/Next button visibility
  function updatePaginationControls() {
    const totalPages = Math.ceil(filteredRows.length / rowsPerPage) || 1;
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;

    prevBtn.style.visibility = currentPage > 1 ? "visible" : "hidden";
    nextBtn.style.visibility = currentPage < totalPages ? "visible" : "hidden";
  }

  // Previous page
  window.prevPage = function () {
    if (currentPage > 1) {
      currentPage--;
      displayRows();
    }
  };

  // Next page
  window.nextPage = function () {
    const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      displayRows();
    }
  };

  // Live search
  searchInput.addEventListener("keyup", () => {
    const filter = searchInput.value.toLowerCase();

    filteredRows = allRows.filter(row => {
      const cells = row.getElementsByTagName("td");
      if (!cells.length) return false;

      const title = cells[1].textContent.toLowerCase();
      const author = cells[2].textContent.toLowerCase();
      const category = cells[3].textContent.toLowerCase();
      const email = cells[5].textContent.toLowerCase();

      return (
        title.includes(filter) ||
        author.includes(filter) ||
        category.includes(filter) ||
        email.includes(filter)
      );
    });

    // Reset to first page and display
    currentPage = 1;
    displayRows();
  });

  // Initial display
  displayRows();
});
