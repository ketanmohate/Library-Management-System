let allCategories = [];
let currentPage = 1;
const rowsPerPage = 5;

window.onload = async () => {
  try {
    const res = await fetch('/getCategories');
    allCategories = await res.json();
    displayPage(allCategories, currentPage);
    setupPagination();
  } catch (err) {
    console.error('Failed to fetch categories', err);
  }
};

function searchCategories(keyword) {
  keyword = keyword.toLowerCase();
  const filtered = allCategories.filter(cat =>
    cat.name.toLowerCase().includes(keyword)
  );
  currentPage = 1;
  displayPage(filtered, currentPage);
  setupPagination(filtered);
}

function displayPage(data, page) {
  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";

  if (data.length === 0) {
    tableBody.innerHTML = `
      <tr><td colspan="4" class="no-data">No matching categories found 😥...</td></tr>`;
    document.getElementById("pageIndicator").textContent = "Page 0 of 0";
    return;
  }

  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const paginated = data.slice(start, end);

  paginated.forEach((item, index) => {
    tableBody.innerHTML += `
      <tr>
        <td>${start + index + 1}</td>
        <td>${item.name}</td>
        <td><a href="/beforeUpdateCat?id=${item.id}" class="btn-update">Update</a></td>
        <td><a href="/deleteCategores?id=${item.id}" class="btn-delete"
               onclick="return confirm('Are you sure you want to delete this category?')">Delete</a></td>
      </tr>`;
  });

  const totalPages = Math.ceil(data.length / rowsPerPage);
  document.getElementById("pageIndicator").textContent = `Page ${page} of ${totalPages}`;
  document.getElementById("prevBtn").disabled = page === 1;
  document.getElementById("nextBtn").disabled = page === totalPages;
}

function setupPagination(data = allCategories) {
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  prevBtn.onclick = () => {
    if (currentPage > 1) {
      currentPage--;
      displayPage(data, currentPage);
    }
  };

  nextBtn.onclick = () => {
    if (currentPage < Math.ceil(data.length / rowsPerPage)) {
      currentPage++;
      displayPage(data, currentPage);
    }
  };
}
