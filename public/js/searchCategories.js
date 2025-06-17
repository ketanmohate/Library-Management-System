let allCategories = [];

// Fetch all categories when page loads
window.onload = async () => {
  try {
    const res = await fetch('/getCategories');
    allCategories = await res.json();
    displayCategories(allCategories);
  } catch (err) {
    console.error('Failed to fetch categories', err);
  }
};

function searchCategories(keyword) {
  keyword = keyword.toLowerCase();
  const filtered = allCategories.filter(cat =>
    cat.name.toLowerCase().includes(keyword)
  );
  displayCategories(filtered);
}

function displayCategories(data) {
  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = ""; // Clear old content

  if (data.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="4" class="no-data">No matching categories found 😥...</td>
      </tr>`;
    return;
  }

  data.forEach((item, index) => {
    tableBody.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${item.name}</td>
        <td>
          <a href="/beforeUpdateCat?id=${item.id}" class="btn-update">Update</a>
        </td>
        <td>
          <a href="/deleteCategores?id=${item.id}" class="btn-delete"
             onclick="return confirm('Are you sure you want to delete this category?')">Delete</a>
        </td>
      </tr>`;
  });
}
