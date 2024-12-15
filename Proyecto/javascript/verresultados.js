window.addEventListener('load', function () {
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
