window.addEventListener('load', function () {
    // Obtener las preguntas del examen desde localStorage
    const preguntas = JSON.parse(localStorage.getItem('preguntas')) || [];
    if (!preguntas.length) return alert('No se encontraron preguntas para el examen.');

    const carruselContainer = document.getElementById('carrusel-container');
    let preguntaIndex = 0;

    // Almacenar las respuestas seleccionadas por el alumno
    const respuestasSeleccionadas = [];

    // Mostrar las preguntas en el carrusel
    function mostrarPregunta() {
        // Limpiar el contenedor
        carruselContainer.innerHTML = '';

        // Obtener la pregunta actual
        const pregunta = preguntas[preguntaIndex];
        let opcionesHTML = '';

        // Crear las opciones con radio buttons
        ['a', 'b', 'c'].forEach(opcion => {
            opcionesHTML += `
                <label>
                    <input type="radio" name="respuesta" value="${opcion}" data-opcion="${opcion}" ${respuestasSeleccionadas[preguntaIndex] === opcion ? 'checked' : ''}>
                    ${pregunta.opciones[opcion]}
                </label><br>
            `;
        });

        // Crear el HTML de la pregunta
        const preguntaHTML = `
            <div class="pregunta">
                <strong>${pregunta.enunciado}</strong>
                <div class="opciones">
                    ${opcionesHTML}
                </div>
            </div>
        `;
        carruselContainer.innerHTML = preguntaHTML;

        // Cambiar el texto del botón "Siguiente" si es la última pregunta
        const botonSiguiente = document.getElementById('siguiente');
        if (preguntaIndex === preguntas.length - 1) {
            botonSiguiente.textContent = 'Terminar';
        } else {
            botonSiguiente.textContent = 'Siguiente';
        }

        // Agregar el evento para capturar la respuesta seleccionada
        const radios = document.querySelectorAll('input[type="radio"][name="respuesta"]');
        radios.forEach(radio => {
            radio.addEventListener('change', function () {
                respuestasSeleccionadas[preguntaIndex] = this.value;  // Guardar la respuesta seleccionada
            });
        });
    }

    // Mostrar la primera pregunta
    mostrarPregunta();

    // Manejar el botón de "Anterior"
    document.getElementById('anterior').addEventListener('click', function () {
        if (preguntaIndex > 0) {
            preguntaIndex--;
            mostrarPregunta();
        }
    });

    // Manejar el botón de "Siguiente"
    document.getElementById('siguiente').addEventListener('click', function () {
        if (preguntaIndex < preguntas.length - 1) {
            preguntaIndex++;
            mostrarPregunta();
        } else {
            // Calcular la nota
            let respuestasCorrectas = 0;

            // Comparar las respuestas seleccionadas con las respuestas correctas
            preguntas.forEach((pregunta, index) => {
                const respuestaCorrecta = pregunta.correcta; // Aquí obtenemos la respuesta correcta de la pregunta
                if (respuestasSeleccionadas[index] === respuestaCorrecta) {
                    respuestasCorrectas++;
                }
            });

            const nota = (respuestasCorrectas / preguntas.length) * 10; // Nota sobre 10

            // Obtener el nombre del alumno desde localStorage
            const nombreAlumno = localStorage.getItem('sesion') || 'Alumno Desconocido';

            // Guardar el resultado en localStorage
            const resultados = JSON.parse(localStorage.getItem('resultados')) || [];
            resultados.push({
                nombre: nombreAlumno,
                nota: nota.toFixed(2) // Guardar la nota con dos decimales
            });
            localStorage.setItem('resultados', JSON.stringify(resultados));

            // Guardar las respuestas seleccionadas en localStorage si lo deseas
            localStorage.setItem('respuestasSeleccionadas', JSON.stringify(respuestasSeleccionadas));

            // Redirigir a la página 'realizarexamen.html'
            window.location.href = './realizarexamen.html';  // Cambia la URL según corresponda
        }
    });
});
