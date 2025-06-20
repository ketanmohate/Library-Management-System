document.addEventListener("DOMContentLoaded", () => {
  const rows = Array.from(document.querySelectorAll("#returnList tr"));
  const rowsPerPage = 5;
  let currentPage = 1;
  let filteredRows = [...rows];

  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const pageInfo = document.getElementById("pageInfo");

  function displayRows() {
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    rows.forEach(row => row.style.display = "none");
    filteredRows.slice(start, end).forEach(row => row.style.display = "");

    pageInfo.textContent = `Page ${currentPage}`;

    prevBtn.style.pointerEvents = currentPage === 1 ? "none" : "auto";
    prevBtn.style.opacity = currentPage === 1 ? "0.4" : "1";

    nextBtn.style.pointerEvents = end >= filteredRows.length ? "none" : "auto";
    nextBtn.style.opacity = end >= filteredRows.length ? "0.4" : "1";
  }

  window.prevPage = () => {
    if (currentPage > 1) {
      currentPage--;
      displayRows();
    }
  };

  window.nextPage = () => {
    if ((currentPage * rowsPerPage) < filteredRows.length) {
      currentPage++;
      displayRows();
    }
  };

  // ✅ Search by Book Title and Email only
  document.getElementById("searchInput").addEventListener("keyup", function () {
    const keyword = this.value.toLowerCase();

    filteredRows = rows.filter(row => {
      const bookTitle = row.cells[1]?.textContent.toLowerCase();
      const email = row.cells[3]?.textContent.toLowerCase();
      return bookTitle.includes(keyword) || email.includes(keyword);
    });

    currentPage = 1;
    displayRows();
  });

  displayRows();
});
