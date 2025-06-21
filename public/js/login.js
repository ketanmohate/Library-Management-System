function togglePassword() {
  const passwordInput = document.getElementById('password');
  const type = passwordInput.type === "password" ? "text" : "password";
  passwordInput.type = type;
}

// Remove message on typing
document.addEventListener("DOMContentLoaded", () => {
  const msgSpan = document.querySelector(".spanmsg");
  const inputs = document.querySelectorAll("input");

  inputs.forEach(input => {
    input.addEventListener("input", () => {
      if (msgSpan) {
        msgSpan.textContent = "";
      }
    });
  });
});
