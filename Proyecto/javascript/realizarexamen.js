window.addEventListener('load', function () {
    // Obtener los exámenes del localStorage
    let examenes = JSON.parse(localStorage.getItem('examenes')) || [];
    let listaPendientes = document.getElementById('lista-examenes-pendientes');
    let listaRealizados = document.getElementById('lista-examenes-realizados');
    let alumno = localStorage.getItem('sesion') || 'Alumno desconocido'; // Obtener el nombre del alumno

    // Obtener los intentos desde el localStorage
    let intentos = JSON.parse(localStorage.getItem('intentos')) || [];

    // Filtrar los exámenes pendientes (exámenes que no han sido realizados)
    let examenesPendientes = examenes.filter(examen => 
        !intentos.some(intent => intent.examen === examen.nombre && intent.alumno === alumno && intent.realizado)
    );

    // Filtrar los exámenes realizados (exámenes que ya tienen un intento realizado para este alumno)
    let examenesRealizados = intentos.filter(intent => intent.alumno === alumno && intent.realizado);

    // Mostrar los exámenes pendientes
    examenesPendientes.forEach(examen => {
        let li = document.createElement('li');
        li.textContent = examen.nombre;
        let botonRealizar = document.createElement('button');
        botonRealizar.textContent = 'Realizar Examen';
        botonRealizar.addEventListener('click', function() {
            // Crear un nuevo intento en el localStorage bajo la clave 'intentos'
            intentos.push({
                examen: examen.nombre,
                alumno: alumno,
                realizado: false,
                nota: null
            });
            localStorage.setItem('intentos', JSON.stringify(intentos));
            
            // Guardar el examen actual para cargarlo en examen.js
            localStorage.setItem('examenActual', JSON.stringify(examen));
            window.location.href = 'examen.html';
        });
        li.appendChild(botonRealizar);
        listaPendientes.appendChild(li);
    });

    // Mostrar los exámenes realizados con su nota (solo los que corresponden al alumno)
    examenesRealizados.forEach(intento => {
        let li = document.createElement('li');
        li.textContent = `${intento.examen} - Nota: ${intento.nota}`;
        listaRealizados.appendChild(li);
    });
});
