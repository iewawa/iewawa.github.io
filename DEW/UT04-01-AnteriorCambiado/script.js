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


    // Mostrar/ocultar contraseña
    document.getElementById('mostrarContraseña').addEventListener('change', togglePasswordVisibility);

    /**
     * Alterna la visibilidad del texto de la contraseña.
     */
    function togglePasswordVisibility() {
        const passwordInput = document.getElementById('password');
        if (this.checked) {
            passwordInput.type = 'text';
        } else {
            passwordInput.type = 'password';
        }
    }

    /**
     * Actualiza el contador de caracteres debajo del input.
     * @param {HTMLElement} input
     * @param {string} idContador
     */
    function actualizarContador(input, idContador) {
        const contador = document.getElementById(idContador);
        contador.textContent = `${input.value.length}/${input.maxLength || input.minLength} caracteres`;
    }
});
