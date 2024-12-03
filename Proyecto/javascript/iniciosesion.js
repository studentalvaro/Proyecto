window.addEventListener("load", function () {
    document.getElementById("iniciarsesion").addEventListener("click", function (event) {
        event.preventDefault();

        let usuario = document.getElementById("usuario").value;
        let password = document.getElementById("password").value;

        // Validamos si los campos están vacíos
        if (isEmpty(usuario) || isEmpty(password)) {
            mostrarMensajeError("Usuario y contraseña requeridos");
            return;
        }

        // En caso de que sea administrador
        if (usuario === "admin" && password === "admin") {
            location.href = "admin.html";
            return;
        }

        // Obtenemos usuarios registrados del localStorage
        let usuariosRegistrados = JSON.parse(localStorage.getItem("Usuarios"));
        usuariosRegistrados = usuariosRegistrados == null ? [] : usuariosRegistrados;

        // Comprobamos si el usuario está registrado
        let usuarioExiste = false;

        for (let i = 0; i < usuariosRegistrados.length; i++) {
            if (usuariosRegistrados[i].usuario === usuario && usuariosRegistrados[i].contrasena === password && usuariosRegistrados[i].validado) {
                usuarioExiste = true;
                
                if(usuariosRegistrados[i].tipo=="Alumno"){
                    location.href = "alumno.html";
                    return;
                }else {
                    location.href = "profesor.html"
                    return;
                }
            }
        }

        // Si ninguna credencial coincide, mostramos error
        if (!usuarioExiste) {
            mostrarMensajeError("Usuario / contraseña incorrectos");
        }
    });

//Funciones auxiliares

    // Función para verificar si una cadena está vacía
    function isEmpty(str) {
        return str.trim().length === 0; // Usamos trim() para evitar espacios en blanco
    }

    // Función para mostrar mensajes de error
    function mostrarMensajeError(mensaje) {
        const mensajeError = document.getElementById("mensajeError");
        mensajeError.textContent = mensaje;
        mensajeError.style.display = "block";
        mensajeError.style.color = "red";
    }
});
