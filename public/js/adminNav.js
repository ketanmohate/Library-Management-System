document.getElementById("logoutBtn").addEventListener("click", function () {
  if (confirm("Are you sure you want to logout?")) {
    window.location.href = "/"; // update this path as needed
  }
});
