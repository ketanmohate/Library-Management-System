// const itemsPerPage = 5;  
// let currentPage = 1;

// const allRows = Array.from(document.querySelectorAll("#tableBody tr"));
// const totalPages = Math.ceil(allRows.length / itemsPerPage);

// function showPage(page) {
//     const start = (page - 1) * itemsPerPage;
//     const end = start + itemsPerPage;

//     allRows.forEach((row, index) => {
//         row.style.display = index >= start && index < end ? "table-row" : "none";
//     });

//     document.getElementById("prevBtn").disabled = page === 1;
//     document.getElementById("nextBtn").disabled = page === totalPages;

//     document.getElementById("pageCount").innerText = `Page ${currentPage} of ${totalPages}`;
// }

// document.getElementById("prevBtn").addEventListener("click", () => {
//     if (currentPage > 1) {
//         currentPage--;
//         showPage(currentPage);
//     }
// });

// document.getElementById("nextBtn").addEventListener("click", () => {
//     if (currentPage * itemsPerPage < allRows.length) {
//         currentPage++;
//         showPage(currentPage);
//     }
// });

// showPage(currentPage);

let itemsPerPage = 5;
let currentPage = 1;
let allRows = [];
let totalPages = 1;

function setupPagination() {
    allRows = Array.from(document.querySelectorAll("#tableBody tr"));
    totalPages = Math.ceil(allRows.length / itemsPerPage);
    currentPage = 1;

    showPage(currentPage);
}

function showPage(page) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    allRows.forEach((row, index) => {
        row.style.display = index >= start && index < end ? "table-row" : "none";
    });

    document.getElementById("prevBtn").disabled = page === 1;
    document.getElementById("nextBtn").disabled = page === totalPages || totalPages === 0;

    document.getElementById("pageCount").innerText = `Page ${currentPage} of ${totalPages}`;
}

document.addEventListener("DOMContentLoaded", () => {
    setupPagination();

    document.getElementById("prevBtn").addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            showPage(currentPage);
        }
    });

    document.getElementById("nextBtn").addEventListener("click", () => {
        if (currentPage < totalPages) {
            currentPage++;
            showPage(currentPage);
        }
    });
});
