inputIds.forEach((id) => {
  const inputField = document.getElementById(id);
  if (!inputField) return;

  let errorSpan = document.getElementById(id + "Error");
  if (!errorSpan) {
    errorSpan = document.createElement("span");
    errorSpan.id = id + "Error";
    errorSpan.classList.add("error-msg");
    errorSpan.style.color = "red";
    inputField.parentNode.appendChild(errorSpan);
  }

  inputField.addEventListener("input", () => {
    errorSpan.textContent = "";

    const globalMsg = document.querySelector("form .success-msg, form .error-msg");
    if (globalMsg) {
      globalMsg.textContent = "";
      globalMsg.classList.remove("success-msg", "error-msg");
    }
  });

  inputField.addEventListener("focus", () => {
    errorSpan.textContent = "";

    const globalMsg = document.querySelector("form .success-msg, form .error-msg");
    if (globalMsg) {
      globalMsg.textContent = "";
      globalMsg.classList.remove("success-msg", "error-msg");
    }

    if (id === "user" && inputField.value === "Enter username") {
      inputField.value = "";
    }
  });
});
