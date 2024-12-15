window.addEventListener('load', function () {
    //Comprobaciones de sesión
    if (this.localStorage.getItem("sesion") == null || this.localStorage.getItem("sesion") == false) {
        this.location.href = "inicio.html";
    }

    // Obtener los intentos desde el localStorage
    let intentos = JSON.parse(localStorage.getItem('intentos')) || [];

    // Obtener el contenedor de los intentos
    let listaIntentos = document.getElementById('lista-intentos');

    // Mostrar todos los intentos realizados
    intentos.forEach(intento => {
        let li = document.createElement('li');
        li.textContent = `${intento.alumno} - Examen: ${intento.examen} - Nota: ${intento.nota}`;
        listaIntentos.appendChild(li);
    });
});
