// Optional: Auto-close other dropdowns
document.querySelectorAll('.accordion-button').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.accordion-button').forEach(btn => {
      if (btn !== button) {
        btn.classList.add('collapsed');
        const target = btn.getAttribute('data-bs-target');
        document.querySelector(target).classList.remove('show');
      }
    });
  });
});
