document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("name");

  // Create and attach error span if not already present
  let errorSpan = document.getElementById("nameError");
  if (!errorSpan) {
    errorSpan = document.createElement("span");
    errorSpan.id = "nameError";
    errorSpan.classList.add("error-msg");
    errorSpan.style.color = "red";
    inputField.parentNode.appendChild(errorSpan);
  }

  // Select the global server message span (from EJS)
  const globalMsg = document.querySelector(".success-msg, .error-msg:not([id])");

  // Validation on input
  inputField.addEventListener("input", () => {
    const value = inputField.value.trim();

    // Clear flash msg from server
    if (globalMsg) {
      globalMsg.textContent = "";
      globalMsg.classList.remove("success-msg", "error-msg");
    }

    // Validate input (alphabets and spaces only)
    if (!/^[A-Za-z\s]+$/.test(value)) {
      errorSpan.textContent = "Only alphabets are allowed.";
    } else {
      errorSpan.textContent = "";
    }
  });

  // Clear messages on focus
  inputField.addEventListener("focus", () => {
    errorSpan.textContent = "";
    if (globalMsg) {
      globalMsg.textContent = "";
      globalMsg.classList.remove("success-msg", "error-msg");
    }
  });
});
