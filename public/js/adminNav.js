document.getElementById("logoutBtn").addEventListener("click", function () {
  if (confirm("Are you sure you want to logout?")) {
    // Redirect to login page
    window.location.href = "login.html"; // update this path as needed
  }
});
