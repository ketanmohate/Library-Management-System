
const itemsPerPage = 20;
let currentPage = 1;
const allCards = Array.from(document.querySelectorAll(".book-item"));

function showPage(page) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    allCards.forEach((card, index) => {
        card.style.display = index >= start && index < end ? "block" : "none";
    });

    document.getElementById("prevBtn").disabled = page === 1;
    document.getElementById("nextBtn").disabled = end >= allCards.length;
}

document.getElementById("prevBtn").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
    }
});

document.getElementById("nextBtn").addEventListener("click", () => {
    if (currentPage * itemsPerPage < allCards.length) {
        currentPage++;
        showPage(currentPage);
    }
});

showPage(currentPage);