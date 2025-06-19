document.addEventListener("DOMContentLoaded", () => {
  const fields = {
    fullName: {
      el: document.getElementById("fullName"),
      errorEl: document.getElementById("fullNameError"),
      validate: value => /^[A-Za-z\s]+$/.test(value.trim()),
      message: "Only alphabets allowed"
    },
    email: {
      el: document.getElementById("email"),
      errorEl: document.getElementById("emailError"),
      validate: value => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value.trim()),
      message: "Enter a valid email"
    },
    password: {
      el: document.getElementById("password"),
      errorEl: document.getElementById("passwordError"),
      validate: value => value.trim().length >= 6,
      message: "Password must be at least 6 characters"
    },
    confirmPassword: {
      el: document.getElementById("confirmPassword"),
      errorEl: document.getElementById("confirmPasswordError"),
      validate: () => document.getElementById("confirmPassword").value === document.getElementById("password").value,
      message: "Passwords do not match"
    }
  };

  const globalMsg = document.querySelector(".success-msg, .error-msg:not([id])");

  Object.values(fields).forEach(({ el, errorEl, validate, message }) => {
    el.addEventListener("input", () => {
      const value = el.value.trim();

      // Clear global flash message
      if (globalMsg) {
        globalMsg.textContent = "";
        globalMsg.classList.remove("success-msg", "error-msg");
      }

      // Validate field
      if (!validate(value)) {
        errorEl.textContent = message;
      } else {
        errorEl.textContent = "";
      }

      // For confirm password specifically, validate both
      if (el.id === "password" || el.id === "confirmPassword") {
        const confirmField = fields.confirmPassword;
        confirmField.errorEl.textContent =
          confirmField.validate() ? "" : confirmField.message;
      }
    });
  });
});
