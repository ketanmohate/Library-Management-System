 // Load books when category is selected
    document.getElementById('categoryInput').addEventListener('change', function () {
      const category = this.value;

      fetch(`/booksByCategory?category=${encodeURIComponent(category)}`)
        .then(response => response.json())
        .then(data => {
          const bookDropdown = document.getElementById('bookDropdown');
          bookDropdown.innerHTML = '<option value="">Select a book</option>';
          if (data.books && data.books.length > 0) {
            data.books.forEach(book => {
              const option = document.createElement('option');
              option.value = book.title;
              option.textContent = book.title;
              bookDropdown.appendChild(option);
            });
          } else {
            const option = document.createElement('option');
            option.value = '';
            option.textContent = 'No books available';
            bookDropdown.appendChild(option);
          }
        })
        .catch(error => {
          console.error('Error fetching books:', error);
        });
    });

    // Auto-fill return date as issue date + 7 days
    document.getElementById('issueDate').addEventListener('change', function () {
      const issueDate = new Date(this.value);
      if (!isNaN(issueDate)) {
        const returnDate = new Date(issueDate);
        returnDate.setDate(returnDate.getDate() + 7);
        const formattedReturnDate = returnDate.toISOString().split('T')[0];
        document.getElementById('returnDate').value = formattedReturnDate;
      }
    });