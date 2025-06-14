let searchStudents = (str) => {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            let tableBody = document.getElementById("tableBody");

            tableBody.innerHTML = "";

            let responseData = this.responseText;
            let jsonObj = JSON.parse(responseData);

            jsonObj.forEach((item, index) => {
                let row = document.createElement("tr");

                let column = document.createElement("td");
                column.innerHTML = "" + (index + 1);
                row.appendChild(column);

                column = document.createElement("td");
                column.innerHTML = "" + item.name;
                row.appendChild(column);

                column = document.createElement("td");
                column.innerHTML = "" + item.email;
                row.appendChild(column);

                column = document.createElement("td");
                column.innerHTML = "" + item.password;
                row.appendChild(column);

                column = document.createElement("td");
                column.innerHTML = "" + item.created_at;
                row.appendChild(column);

                // Update button
                column = document.createElement("td");
                column.innerHTML = `<a class="btn btn-danger" href="/updateStudent/${item.id}">UPDATE</a>`;
                row.appendChild(column);

                // Delete button
                column = document.createElement("td");
                column.innerHTML = `<a class="btn btn-danger" href="/deleteStudent/${item.id}" onclick="return confirm('Are you sure you want to delete this student data?')">DELETE</a>`;
                row.appendChild(column);

                tableBody.appendChild(row);
            });
        }
    };

    xhttp.open("GET", "/searchStudent?sd=" + str, true);
    xhttp.send();
}
