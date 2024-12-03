window.addEventListener("load", function () {
    document.getElementById("registro").addEventListener("click", function (event) {
        event.preventDefault();

        let user = document.getElementById("usuario").value;
        let password = document.getElementById("password").value;
        let password2 = document.getElementById("password2").value;
        let tipoUsuario = document.querySelector('input[name="tipoUsuario"]:checked');

        // Cargar el array de usuarios registrados desde localStorage, o inicializarlo vacío si no existe
        let usuariosRegistrados = JSON.parse(localStorage.getItem("Usuarios")) || [];

        // Validaciones
        if (isEmpty(user) || isEmpty(password) || isEmpty(password2)) {
            mostrarMensajeError("Usuario, contraseña y repetir contraseña son obligatorios.", "red");
        } else if (!tipoUsuario) {
            mostrarMensajeError("Debes seleccionar si eres Profesor o Alumno.", "red");
        } else if (!validacontrasena(password)) {
            mostrarMensajeError("La contraseña debe incluir al menos una mayúscula, un número y un carácter especial.", "red");
        } else if (password !== password2) {
            mostrarMensajeError("Las contraseñas no coinciden.", "red");
        } else {
            mostrarMensajeError("Usuario registrado", "green");

            // Creamos un objeto usuario con los datos introducidos
            let usuario = { 
                usuario: user, 
                contrasena: password, 
                tipo: tipoUsuario.value,
                validado: false 
            };

            // Añadimos el nuevo usuario al array
            usuariosRegistrados.push(usuario);

            // Guardamos el array actualizado en localStorage
            localStorage.setItem("Usuarios", JSON.stringify(usuariosRegistrados));

            // Redirigimos a la página de inicio después de 3 segundos
            setTimeout(function () {
                location.href = "inicio.html";
            }, 3000);
        }
    });

    // Funciones auxiliares

    function isEmpty(str) {
        return str.trim().length === 0;
    }

    function validacontrasena(password) {
        let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,}$/;
        return password.match(passwordPattern);
    }

    function mostrarMensajeError(mensaje, color) {
        const mensajeError = document.getElementById("mensajeError");
        mensajeError.textContent = mensaje;
        mensajeError.style.display = "block";
        mensajeError.style.color = color;
    }
});
