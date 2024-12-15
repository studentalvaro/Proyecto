document.addEventListener('DOMContentLoaded', () => {
    const examenes = JSON.parse(localStorage.getItem('examenes')) || [];
    const listaExamenesPendientes = document.getElementById('lista-examenes-pendientes');

    if (examenes.length === 0) {
        listaExamenesPendientes.innerHTML = '<p>No hay exámenes disponibles.</p>';
    } else {
        examenes.forEach((examen, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${examen.nombre}</strong>
                <button data-index="${index}" class="realizar-examen">Realizar examen</button>
            `;
            listaExamenesPendientes.appendChild(li);
        });
    }

    // Agregar evento para el botón "Realizar examen"
    listaExamenesPendientes.addEventListener('click', (event) => {
        if (event.target.classList.contains('realizar-examen')) {
            const index = event.target.getAttribute('data-index');
            realizarExamen(index);
        }
    });

    // Función para redirigir al examen
    function realizarExamen(index) {
        const examen = examenes[index];
        if (!examen) return alert('Examen no encontrado.');

        // Guardar el examen en localStorage para usarlo en examen.html
        localStorage.setItem('examenActual', JSON.stringify(examen));

        // Redirigir a la página examen.html
        window.location.href = './examen.html';
    }
});
