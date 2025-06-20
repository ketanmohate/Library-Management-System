document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("image");
  const fileChosen = document.getElementById("file-chosen");

  // Show chosen file name
  fileInput.addEventListener("change", () => {
    fileChosen.textContent = fileInput.files[0]?.name || "No file chosen";
  });

  // Flash message (success or error) remover
  const globalMsg = document.querySelector(".success-msg, .error-msg:not([id])");

  // Validation fields
  const fields = {
    title: {
      el: document.getElementById("title"),
      errorEl: document.getElementById("titleError"),
      validate: val => /^[A-Za-z\s]+$/.test(val),
      message: "Only alphabets allowed in Title"
    },
    author: {
      el: document.getElementById("author"),
      errorEl: document.getElementById("authorError"),
      validate: val => /^[A-Za-z\s]+$/.test(val),
      message: "Only alphabets allowed in Author"
    },
    publisher: {
      el: document.getElementById("publisher"),
      errorEl: document.getElementById("publisherError"),
      validate: val => /^[A-Za-z\s]+$/.test(val),
      message: "Only alphabets allowed in Publisher"
    }
  };

  Object.values(fields).forEach(({ el, errorEl, validate, message }) => {
    // Runtime validation
    el.addEventListener("input", () => {
      const value = el.value.trim();

      // Clear flash message on any input
      if (globalMsg) {
        globalMsg.remove();
      }

      // Validate input
      if (!validate(value)) {
        errorEl.textContent = message;
        errorEl.style.color = "red";
      } else {
        errorEl.textContent = "";
      }
    });

    // On focus: clear error + flash
    el.addEventListener("focus", () => {
      errorEl.textContent = "";

      if (globalMsg) {
        globalMsg.remove();
      }
    });
  });
});
