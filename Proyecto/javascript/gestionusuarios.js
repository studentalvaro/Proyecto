window.addEventListener("load", function () {
    //Comprobaciones de sesión
    if (localStorage.getItem("sesion") == null || localStorage.getItem("sesion") == false) {
        this.location.href = "inicio.html";
    }

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
                    <input type="text" id="nuevaContrasena${index}" placeholder="Nueva Contrasena">
                    <button onclick="cambiarContrasena(${index})">Cambiar</button>
                </td>
                <td>
                    <button onclick="cambiarEstado(${index})">Validar / Invalidar</button>
                    <button onclick="eliminarUsuario(${index})">Eliminar</button>
                </td>`;
            tablaBody.appendChild(fila);
        });
    }

    // Función para cambiar el estado de validado
    cambiarEstado = function (index) {
        usuarios[index].validado = !usuarios[index].validado; // Cambiar entre true y false
        localStorage.setItem("Usuarios", JSON.stringify(usuarios)); // Guardar cambios en localStorage
        cargarTabla(); // Recargar la tabla
    };

    // Función para eliminar un usuario por su índice
    eliminarUsuario = function (index) {
        if (confirm("¿Seguro que deseas eliminar este usuario?")) {
            usuarios.splice(index, 1);
            localStorage.setItem("Usuarios", JSON.stringify(usuarios));
            cargarTabla();
        }
    };

    // Función para cambiar la contraseña de un usuario
    cambiarContrasena = function (index) {
        // Obtener el valor de la nueva contraseña desde el input correspondiente
        const nuevaContrasena = document.getElementById(`nuevaContrasena${index}`).value;

        // Validar la contraseña
        if (validacontrasena(nuevaContrasena)) {
            // Cambiar la contraseña del usuario
            usuarios[index].contrasena = nuevaContrasena;

            // Guardar cambios en localStorage
            localStorage.setItem("Usuarios", JSON.stringify(usuarios));

            // Recargar la tabla
            cargarTabla();

            // Mensaje de éxito
            mostrarMensajeError("Contraseña cambiada correctamente.", "green");
            
        } else {
            // Mostrar mensaje de error
            mostrarMensajeError("La contraseña debe incluir al menos una mayúscula, un número y un carácter especial.", "red");
        }
    };

    // Función para validar el formato de la contraseña
    function validacontrasena(password) {
        let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,}$/;
        return password.match(passwordPattern);
    }

    // Función para mostrar mensajes de error
    function mostrarMensajeError(mensaje, color) {
        const mensajeError = document.getElementById("mensajeError");
        mensajeError.textContent = mensaje;
        mensajeError.style.display = "";
        mensajeError.style.color = color;
    }

    // Cargar la tabla al inicio
    cargarTabla();

});
