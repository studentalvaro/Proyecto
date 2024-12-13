window.addEventListener('DOMContentLoaded', () => {
    // Leer categorías del localStorage y añadirlas al desplegable
    let categorias = JSON.parse(localStorage.getItem('categorias')) || [];
    let categoriaSelect = document.getElementById('categoria');

    categorias.forEach(categoria => {
        let option = document.createElement('option');
        option.value = categoria;
        option.textContent = categoria;
        categoriaSelect.appendChild(option);
    });

    // Guardar preguntas en el localStorage
    let form = document.getElementById('question-form');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        let enunciado = document.getElementById('enunciado').value;
        let opcionA = document.getElementById('a').value;
        let opcionB = document.getElementById('b').value;
        let opcionC = document.getElementById('c').value;
        let correcta = document.querySelector('input[name="correcta"]:checked');
        let categoria = document.getElementById('categoria').value;

        if (!enunciado || !opcionA || !opcionB || !opcionC || !correcta || !categoria) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        let preguntas = JSON.parse(localStorage.getItem('preguntas')) || [];
        let nuevaPregunta = {
            enunciado: enunciado,
            opciones: {
                a: opcionA,
                b: opcionB,
                c: opcionC
            },
            correcta: correcta.value,
            categoria: categoria
        };

        preguntas.push(nuevaPregunta);
        localStorage.setItem('preguntas', JSON.stringify(preguntas));

        alert('Pregunta guardada exitosamente.');
        form.reset();
    });
});

