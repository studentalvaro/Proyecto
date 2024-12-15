window.addEventListener("DOMContentLoaded", function () {
    //Comprobaciones de sesión y logout
    if (this.localStorage.getItem("sesion") == null || this.localStorage.getItem("sesion") == false) {
        this.location.href = "inicio.html";
    }

    this.document.getElementById("logout").addEventListener("click", function () {
        localStorage.removeItem("sesion");
        location.href = "inicio.html"
    });


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
                    <input type="text" id="nuevaContrasena" placeholder="Nueva Contrasena">
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

    cambiarContrasena = function (index) {
        if (validacontrasena(document.getElementById("nuevaContrasena").value)) {
            usuarios[index].contrasena = document.getElementById("nuevaContrasena").value; // Cambiar entre true y false
            localStorage.setItem("Usuarios", JSON.stringify(usuarios)); // Guardar cambios en localStorage
            cargarTabla(); // Recargar la tabla
            this.location.href="gestionusuarios.html";

        } else {
            mostrarMensajeError("La contraseña debe incluir al menos una mayúscula, un número y un carácter especial.", "red");
        }
    };

    function validacontrasena(password) {
        let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,}$/;
        return password.match(passwordPattern);
    }

    function mostrarMensajeError(mensaje, color) {
        const mensajeError = document.getElementById("mensajeError");
        mensajeError.textContent = mensaje;
        mensajeError.style.display = "";
        mensajeError.style.color = color;
    }


    // Cargar la tabla al inicio
    cargarTabla();


});
