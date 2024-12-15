document.addEventListener("DOMContentLoaded", function () {
    //Comprobaciones de sesión y logout
    if (this.localStorage.getItem("sesion") == null || this.localStorage.getItem("sesion") == false) {
        this.location.href = "inicio.html";
    }

    this.document.getElementById("logout").addEventListener("click", function () {
        localStorage.removeItem("sesion");
        location.href = "inicio.html"
    });

    // Recuperar categorías de localStorage o inicializar vacío
    let listacategorias = JSON.parse(localStorage.getItem("categorias")) || [];
    let ul = document.getElementById("listaCategorias");

    // Función para renderizar la lista de categorías
    function renderCategorias() {
        ul.innerHTML = ""; // Limpiar la lista antes de renderizar
        listacategorias.forEach(function (categoria) {
            let li = document.createElement("li");
            li.textContent = categoria;

            // Botón para eliminar la categoría
            let btnEliminar = document.createElement("button");
            btnEliminar.textContent = "Eliminar";   
            btnEliminar.style.marginLeft = "10px"; // Espaciado entre texto y botón

            // Manejar evento de eliminar categoría
            btnEliminar.addEventListener("click", function () {
                eliminarCategoria(categoria);
            });

            li.appendChild(btnEliminar); // Añadir botón al elemento <li>
            ul.appendChild(li); // Añadir <li> a la lista
        });
    }

    // Función para eliminar una categoría
    function eliminarCategoria(categoria) {
        // Filtrar la categoría que queremos eliminar
        listacategorias = listacategorias.filter(function (item) {
            return item !== categoria;
        });

        // Actualizar localStorage
        localStorage.setItem("categorias", JSON.stringify(listacategorias));

        // Volver a renderizar la lista
        renderCategorias();
    }

    // Renderizar categorías existentes al cargar la página
    renderCategorias();

    // Manejar el evento del botón para añadir categorías
    document.getElementById("anadirCategoria").addEventListener("click", function () {
        let nuevaCategoria = document.getElementById("nuevaCategoria").value.trim();

        if (nuevaCategoria === "") {
            alert("Por favor, introduce una categoría válida.");
            return;
        }

        if (listacategorias.includes(nuevaCategoria)) {
            alert("La categoría ya existe.");
            return;
        }

        // Agregar nueva categoría
        listacategorias.push(nuevaCategoria);
        localStorage.setItem("categorias", JSON.stringify(listacategorias));

        // Volver a renderizar la lista
        renderCategorias();

        // Limpiar el campo de texto
        document.getElementById("nuevaCategoria").value = "";
    });
});
