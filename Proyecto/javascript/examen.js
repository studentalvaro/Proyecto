window.addEventListener('load', function () {

    if (this.localStorage.getItem("sesion") == null || this.localStorage.getItem("sesion") == false) {
        this.location.href = "inicio.html";
    }

    this.document.getElementById("logout").addEventListener("click", function () {
        localStorage.removeItem("sesion");
        location.href = "inicio.html"
    });

    // Obtener el examen actual y las preguntas
    let examen = JSON.parse(localStorage.getItem('examenActual')) || {};
    let preguntas = examen.preguntas || [];
    let alumno = localStorage.getItem('sesion') || 'Alumno desconocido'; // Obtener el nombre del alumno
    let carruselDiv = document.getElementById("carrusel-container");

    // Crear los elementos del carrusel con las preguntas
    preguntas.forEach((pregunta, index) => {
        let divPregunta = document.createElement('div');
        divPregunta.classList.add('pregunta', 'oculta'); // Inicialmente todas ocultas
        divPregunta.dataset.index = index; // Guardar el índice para facilitar la navegación
        if (index === 0) divPregunta.classList.add('activa'); // Mostrar la primera pregunta
        divPregunta.innerHTML = `
            <p>${pregunta.enunciado}</p>
            <div>
                <label><input type="radio" name="pregunta${index}" value="a"> ${pregunta.opciones.a}</label>
                <label><input type="radio" name="pregunta${index}" value="b"> ${pregunta.opciones.b}</label>
                <label><input type="radio" name="pregunta${index}" value="c"> ${pregunta.opciones.c}</label>
            </div>
        `;
        carruselDiv.appendChild(divPregunta);
    });

    let currentQuestionIndex = 0; // Índice de la pregunta actual
    const totalQuestions = preguntas.length;

    // Función para navegar a la siguiente pregunta
    function siguiente() {
        let preguntaActiva = document.querySelector('.pregunta.activa');
        preguntaActiva.classList.replace('activa', 'oculta');

        currentQuestionIndex = (currentQuestionIndex + 1) % totalQuestions; // Ciclar al inicio si llegamos al final

        // Mostrar la pregunta siguiente
        let siguientePregunta = document.querySelector(`.pregunta[data-index="${currentQuestionIndex}"]`);
        siguientePregunta.classList.replace('oculta', 'activa');

        // Controlar el estado de los botones
        actualizarBotones();
    }

    // Función para navegar a la pregunta anterior
    function anterior() {
        let preguntaActiva = document.querySelector('.pregunta.activa');
        preguntaActiva.classList.replace('activa', 'oculta');

        currentQuestionIndex = (currentQuestionIndex - 1 + totalQuestions) % totalQuestions; // Ciclar al final si llegamos al inicio

        // Mostrar la pregunta anterior
        let anteriorPregunta = document.querySelector(`.pregunta[data-index="${currentQuestionIndex}"]`);
        anteriorPregunta.classList.replace('oculta', 'activa');

        // Controlar el estado de los botones
        actualizarBotones();
    }

    // Función para actualizar los botones
    function actualizarBotones() {
        let botonSiguiente = document.getElementById("siguiente");
        let botonAnterior = document.getElementById("anterior");
        let botonFinalizar = document.getElementById("finalizar");

        // Deshabilitar el botón "Anterior" si estamos en la primera pregunta
        if (currentQuestionIndex === 0) {
            botonAnterior.disabled = true;
        } else {
            botonAnterior.disabled = false;
        }

        // Cambiar el botón "Siguiente" por "Finalizar" si estamos en la última pregunta
        if (currentQuestionIndex === totalQuestions - 1) {
            botonSiguiente.style.display = "none";  // Ocultar el botón de "Siguiente"
            botonFinalizar.style.display = "inline"; // Mostrar el botón de "Finalizar"
        } else {
            botonSiguiente.style.display = "inline";
            botonFinalizar.style.display = "none";
        }
    }

    // Añadir eventos a los botones de navegación
    let botonSiguiente = document.getElementById("siguiente");
    let botonAnterior = document.getElementById("anterior");

    botonSiguiente.addEventListener("click", siguiente);
    botonAnterior.addEventListener("click", anterior);

    // Finalizar el examen y guardar la nota
    document.getElementById("finalizar").addEventListener("click", function () {
        // Verificar si todas las preguntas tienen respuesta seleccionada
        if (preguntas.every((pregunta, index) => {
            let opciones = document.getElementsByName(`pregunta${index}`);
            return Array.from(opciones).some(opcion => opcion.checked);
        })) {
            let nota = 0;

            // Calcular la nota basada en las respuestas correctas
            preguntas.forEach((pregunta, index) => {
                let opciones = document.getElementsByName(`pregunta${index}`);
                let respuesta = Array.from(opciones).find(opcion => opcion.checked)?.value;

                if (respuesta === pregunta.correcta) {
                    nota += 1;
                }
            });

            // Calcular la nota sobre 10
            let notaFinal = (nota / preguntas.length) * 10;

            // Obtener los intentos desde el localStorage o crear uno vacío si no existe
            let intentos = JSON.parse(localStorage.getItem('intentos')) || [];

            // Verificar si el intento ya existe en el array de intentos
            let intentoExistente = intentos.find(intento => intento.examen === examen.nombre && intento.alumno === alumno);

            if (intentoExistente) {
                // Si el intento ya existe, solo actualizarlo
                intentoExistente.nota = notaFinal.toFixed(2); // Guardar la nota sobre 10
                intentoExistente.realizado = true; // Marcar como realizado
            } else {
                // Si el intento no existe, agregarlo como nuevo
                let nuevoIntento = {
                    examen: examen.nombre,
                    alumno: alumno,
                    nota: notaFinal.toFixed(2), // Guardar la nota sobre 10
                    realizado: true
                };
                intentos.push(nuevoIntento);
            }

            // Guardar el array de intentos actualizado en el localStorage
            localStorage.setItem('intentos', JSON.stringify(intentos));

            // Mostrar el resultado
            alert(`Examen completado. Nota: ${notaFinal.toFixed(2)}`);
            window.location.href = 'realizarexamen.html'; // Redirigir a la página de exámenes
        } else {
            alert("Por favor, responde todas las preguntas.");
        }
    });

    // Inicializar los botones
    actualizarBotones();
});
