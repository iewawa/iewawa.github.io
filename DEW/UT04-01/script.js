/**
 * @file script.js
 * @brief Manejo del DOM y validación de formularios en una página web
 * @author Ieva Samsina
 * @date 2025
 */

/**
 * @namespace DOM
 * @description Contiene referencias a los elementos HTML utilizados en el script.
 */
const DOM = {
    username: document.getElementById('username'), /**< Input del nombre de usuario */
    password: document.getElementById('password'), /**< Input de la contraseña */
    checkMostrarContrasena: document.getElementById('mostrarContraseña'), /**< Checkbox para mostrar/ocultar la contraseña */
    telefono: document.getElementById('telefono'), /**< Input del número de teléfono */
    codigoPostal: document.getElementById('codigoPostal'), /**< Input del código postal */
    dniTipoSelect: document.getElementById('dniTipo'), /**< Select del tipo de DNI/NIE */
    dniNieInput: document.getElementById('dniNie'), /**< Input del DNI/NIE */
    cuentaRadio: document.getElementById('cuentaradio'), /**< Div que contiene los radio buttons de cuenta */
    selectAnioNacimiento: document.getElementById('nacimiento'), /**< Select del año de nacimiento */
    aficionCheck: document.querySelector('.aficioncheck'), /**< Checkbox de aficiones */
    formulario: document.getElementById('formulario'), /**< Formulario principal */
    cuenta: document.querySelector('input[name="cuenta"]'), /**< Radio button para la cuenta */
    titulo: document.getElementById('titulo'), /**< Input del título */
    descripcion: document.getElementById('descripcion'), /**< Textarea de la descripción */
    contadorTitulo: document.getElementById('contadorTitulo'), /**< Contador de caracteres del título */
    contadorDescripcion: document.getElementById('contadorDescripcion') /**< Contador de caracteres de la descripción */
};

/**
 * @description Evento que se ejecuta cuando el DOM ha sido cargado completamente.
 */
document.addEventListener('DOMContentLoaded', function () {
    const year = new Date().getFullYear();

    /**
     * Genera opciones de años desde 1900 hasta el actual en el select de nacimiento.
     */
    for (let i = 1900; i <= year; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        DOM.selectAnioNacimiento.appendChild(option);
    }

    /**
     * Evento para mostrar/ocultar la contraseña.
     */
    DOM.checkMostrarContrasena.addEventListener('change', toggleVisibilidadContraseña);

    /**
     * Evento de validación del formulario antes de enviarlo.
     */
    DOM.formulario.addEventListener('submit', function (e) {
        const inputs = document.querySelectorAll('input, select, textarea');

        // Limpiar errores previos
        document.querySelectorAll('.error-message').forEach(message => message.remove());

        // Validación de cada campo
        inputs.forEach(input => {
            const valor = input.value.trim();

            // Validar campos requeridos
            if (input.hasAttribute('required') && !valor) {
                e.preventDefault();
                mostrarError(input, 'Este campo es obligatorio.');
            }

            // Validación de la longitud mínima de la contraseña
            if (input.id === 'password' && valor !== '' && valor.length < 5) {
                e.preventDefault();
                mostrarError(input, 'La contraseña debe tener al menos 5 caracteres.');
            }
        });
    });

    /**
     * @function mostrarError
     * @description Muestra un mensaje de error debajo del input correspondiente.
     * @param {HTMLElement} input - Elemento de entrada donde ocurrió el error.
     * @param {string} mensaje - Mensaje de error a mostrar.
     */
    function mostrarError(input, mensaje) {
        const error = document.createElement('span');
        error.classList.add('error-message');
        error.textContent = mensaje;
        input.parentNode.insertBefore(error, input.nextSibling);
    }

    /**
     * @function toggleVisibilidadContraseña
     * @description Alterna la visibilidad del campo de contraseña.
     */
    function toggleVisibilidadContraseña() {
        DOM.password.type = this.checked ? 'text' : 'password';
    }

    /**
     * @function actualizarContador
     * @description Actualiza el contador de caracteres de un input o textarea.
     * @param {HTMLElement} input - Elemento de entrada del que se cuentan los caracteres.
     * @param {string} idContador - ID del contador a actualizar.
     */
    function actualizarContador(input, idContador) {
        const contador = document.getElementById(idContador);
        contador.textContent = `${input.value.length}/${input.maxLength || input.minLength} caracteres`;
    }

    /**
     * Evento para actualizar el contador de caracteres del título.
     */
    DOM.titulo.addEventListener('input', function () {
        actualizarContador(this, 'contadorTitulo');
    });

    /**
     * Evento para actualizar el contador de caracteres de la descripción.
     */
    DOM.descripcion.addEventListener('input', function () {
        actualizarContador(this, 'contadorDescripcion');
    });
});
