document.addEventListener("DOMContentLoaded", function () {
    const tablaBody = document.querySelector("#tabla tbody");

    // Obtener datos del localStorage
    let usuarios = JSON.parse(localStorage.getItem("Usuarios")) || [];

    // Función para cargar los datos en la tabla
    function cargarTabla() {
        // Limpiar las filas actuales
        tablaBody.innerHTML = "";

        // Crear filas para cada usuario
        usuarios.forEach((usuario, index) => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${usuario.usuario}</td>
                <td>${usuario.tipo}</td>
                <td>${usuario.validado ? "Sí" : "No"}</td>
                <td>
                    <button onclick="eliminarUsuario(${index})">Eliminar</button>
                </td>
            `;
            tablaBody.appendChild(fila);
        });
    }

    // Función para guardar un nuevo usuario
    function guardarUsuario() {
        const inputs = document.querySelectorAll("tfoot input");
        const nuevoUsuario = {
            usuario: inputs[0].value.trim(),
            contrasena: inputs[1].value.trim(),
            tipo: inputs[2].value.trim(),
            validado: true // Por defecto, se agrega como validado
        };

        if (!nuevoUsuario.usuario || !nuevoUsuario.contrasena || !nuevoUsuario.tipo) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        usuarios.push(nuevoUsuario);
        localStorage.setItem("Usuarios", JSON.stringify(usuarios));
        cargarTabla();

        // Limpiar los inputs
        inputs.forEach(input => input.value = "");
    }

    // Función para eliminar un usuario por su índice
    window.eliminarUsuario = function (index) {
        if (confirm("¿Seguro que deseas eliminar este usuario?")) {
            usuarios.splice(index, 1);
            localStorage.setItem("Usuarios", JSON.stringify(usuarios));
            cargarTabla();
        }
    };

    // Añadir el evento al botón de guardar
    document.getElementById("guardar").addEventListener("click", guardarUsuario);

    // Cargar la tabla al inicio
    cargarTabla();
});
