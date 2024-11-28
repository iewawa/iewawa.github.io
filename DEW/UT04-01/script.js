document.addEventListener('DOMContentLoaded', function () {
    const selectNacimiento = document.getElementById('nacimiento');
    const year = new Date().getFullYear();

    // Generar años desde 1900 hasta el actual
    for (let i = 1900; i <= year; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectNacimiento.appendChild(option);
    }

    // Actualizar contadores de texto
    document.getElementById('titulo').addEventListener('input', function () {
        actualizarContador(this, 'contadorTitulo');
    });
    document.getElementById('descripcion').addEventListener('input', function () {
        actualizarContador(this, 'contadorDescripcion');
    });

    /**
     * Actualiza el contador de caracteres debajo de un input.
     * @param {HTMLElement} input
     * @param {string} idContador
     */
    function actualizarContador(input, idContador) {
        const contador = document.getElementById(idContador);
        contador.textContent = `${input.value.length}/${input.maxLength} caracteres`;
    }
});
