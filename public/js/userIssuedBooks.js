document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const table = document.getElementById("issuedBooksTable");
  const rows = table.getElementsByTagName("tr");

  searchInput.addEventListener("keyup", function () {
    const filter = searchInput.value.toLowerCase();

    // loop over table rows (start from 1 to skip header row)
    for (let i = 1; i < rows.length; i++) {
      const cells = rows[i].getElementsByTagName("td");

      if (!cells.length) continue;

      const title = cells[1].textContent.toLowerCase();
      const author = cells[2].textContent.toLowerCase();
      const category = cells[3].textContent.toLowerCase();

      if (
        title.includes(filter) ||
        author.includes(filter) ||
        category.includes(filter)
      ) {
        rows[i].style.display = ""; // show row
      } else {
        rows[i].style.display = "none"; // hide row
      }
    }
  });
});