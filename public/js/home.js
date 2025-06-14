// Responsive Navbar
function toggleMenu() {
  const menu = document.getElementById('nav-menu').querySelector('ul');
  menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
}

// Scroll To Top Button
window.onscroll = () => {
  document.getElementById("scrollTopBtn").style.display = window.scrollY > 100 ? "block" : "none";
};

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Modal
// function openModal() {
//   document.getElementById("bookModal").style.display = "flex";
// }
// function closeModal() {
//   document.getElementById("bookModal").style.display = "none";
// }

// Animated Typewriter Text
const text = "Welcome to The Knowledge Hub";
let index = 0;
function typeWriter() {
  if (index < text.length) {
    document.getElementById("typewriter").textContent += text.charAt(index);
    index++;
    setTimeout(typeWriter, 100);
  }
}
window.onload = typeWriter;
