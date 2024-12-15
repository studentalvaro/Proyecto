document.addEventListener("DOMContentLoaded", function () {
    const headerContainer = document.getElementById('header-container');
    const headerContainer2 = document.getElementById('header-container2');
    const footerContainer = document.getElementById('footer-container');

    // Cargar el header
    fetch('./includes/header1.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo cargar el archivo header1.html');
            }
            return response.text();
        })
        .then(data => {
            headerContainer.innerHTML = data;
        })
        .catch(error => {
            console.error('Error al cargar el header:', error);
        });

    // Cargar el header2
    fetch('./includes/header2.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo cargar el archivo header2.html');
            }
            return response.text();
        })
        .then(data => {
            headerContainer2.innerHTML = data;

            // Personalizar saludo después de cargar header2.html
            const nombre = localStorage.getItem("sesion") || "invitado";
            const saludo = document.getElementById("saludo");
            if (saludo) {
                saludo.innerHTML = `Hola ${nombre}!`;
            }
        })
        .catch(error => {
            console.error('Error al cargar el header2:', error);
        });

    // Cargar el footer
    fetch('./includes/footer.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo cargar el archivo footer.html');
            }
            return response.text();
        })
        .then(data => {
            footerContainer.innerHTML = data;
        })
        .catch(error => {
            console.error('Error al cargar el footer:', error);
        });
});
