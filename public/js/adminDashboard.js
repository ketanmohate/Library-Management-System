document.getElementById('loadRegisterForm').addEventListener('click', function () {
    fetch('/admin/register-form')
        .then(response => response.text())
        .then(data => {
            document.getElementById('dynamicContent').innerHTML = data;
        })
        .catch(error => {
            console.error('Error loading form:', error);
        });
});
