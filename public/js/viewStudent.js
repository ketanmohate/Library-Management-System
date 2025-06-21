document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.getElementById("tableBody");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const pageCountSpan = document.getElementById("pageCount");
  const searchInput = document.getElementById("Name");

  let allRows = [];
  let currentPage = 1;
  const rowsPerPage = 5;

  // Render page from rows
  const renderPage = (rows, page) => {
    tableBody.innerHTML = "";
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedRows = rows.slice(start, end);
    paginatedRows.forEach(row => tableBody.appendChild(row));

    const totalPages = Math.ceil(rows.length / rowsPerPage) || 1;
    pageCountSpan.textContent = `Page ${page} of ${totalPages}`;
    prevBtn.disabled = page === 1;
    nextBtn.disabled = page === totalPages;
  };

  // Initialize pagination
  const setupPagination = (rows) => {
    allRows = rows;
    currentPage = 1;
    renderPage(allRows, currentPage);
  };

  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderPage(allRows, currentPage);
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentPage < Math.ceil(allRows.length / rowsPerPage)) {
      currentPage++;
      renderPage(allRows, currentPage);
    }
  });

  // On page load - get initial static rows
  const initialRows = Array.from(document.querySelectorAll("#tableBody tr"));
  setupPagination(initialRows);

  // Search Students
  window.searchStudents = (str) => {
    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const jsonObj = JSON.parse(this.responseText);
        let searchRows = [];

        jsonObj.forEach((item, index) => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td>${item.email}</td>
            <td>${item.password}</td>
            <td>${new Date(item.created_at).toLocaleString()}</td>
            <td><a class="btn btn-primary" href="/beforeUpdateStud?id=${item.id}">UPDATE</a></td>
            <td><a class="btn btn-danger" href="/deleteStudent?id=${item.id}" onclick="return confirm('Are you sure you want to delete this student data?')">DELETE</a></td>
          `;
          searchRows.push(row);
        });

        setupPagination(searchRows);
      }
    };

    xhttp.open("GET", "/searchStudent?sd=" + str, true);
    xhttp.send();
  };

  // Reset to original rows when input is cleared
  searchInput.addEventListener("input", () => {
    if (searchInput.value.trim() === "") {
      setupPagination(initialRows);
    }
  });
});
