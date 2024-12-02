// DOM static selector
const DOM = {
    username: document.getElementById('username'),
    password: document.getElementById('password'),
    checkMostrarContrasena: document.getElementById('mostrarContraseña'),
    telefono: document.getElementById('telefono'),
    codigoPostal: document.getElementById('codigoPostal'),
    dniTipoSelect: document.getElementById('dniTipo'),
    dniNieInput: document.getElementById('dniNie'),
    cuentaRadio: document.getElementById('cuentaradio'),
    selectAnioNacimiento: document.getElementById('nacimiento'),
    aficionCheck: document.querySelector('.aficioncheck'),
    formulario: document.getElementById('formulario'),
    cuenta: document.querySelector('input[name="cuenta"]'),
    titulo: document.getElementById('titulo'),
    descripcion: document.getElementById('descripcion'),
    contadorTitulo: document.getElementById('contadorTitulo'),
    contadorDescripcion: document.getElementById('contadorDescripcion')
};

document.addEventListener('DOMContentLoaded', function () {
    const year = new Date().getFullYear();

    // Genera años desde 1900 hasta el actual
    for (let i = 1900; i <= year; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        DOM.selectAnioNacimiento.appendChild(option);
    }
    // Mostrar/ocultar contraseña
    DOM.checkMostrarContrasena.addEventListener('change', toggleVisibilidadContraseña);

    // --------------------------- VALIDACIÓN ---------------------------

    // Validar el formulario al enviarlo
    DOM.formulario.addEventListener('submit', function (e) {
        const inputs = document.querySelectorAll('input, select, textarea');

        // Limpiar errores previos
        document.querySelectorAll('.error-message').forEach(message => message.remove());

        // Validación de cada campo
        inputs.forEach(input => {

            const valor = input.value.trim();

            // Validar campos requeridos
            if (input.hasAttribute('required') && !valor) {
                e.preventDefault(); // Evitar el envío del formulario
                mostrarError(input, 'Este campo es obligatorio.');
            }

            // Validación de la longitud mínima de la contraseña
            if (input.id === 'password' && valor !== '' && valor.length < 5) {
                e.preventDefault(); 
                mostrarError(input, 'La contraseña debe tener al menos 5 caracteres.');
            }

            // Validar formato de teléfono
            if (input.type === 'tel' && valor !== '' && !validarTelefono(valor)) {
                e.preventDefault(); 
                mostrarError(input, 'Por favor, introduce un número de teléfono válido.');
            }

            // Validar formato del código postal
            if (input.id === 'codigoPostal' && valor !== '' && !validarCodigoPostal(valor)) {
                e.preventDefault(); 
                mostrarError(input, 'Por favor, introduce un código postal válido.');
            }

            // Validar formato del DNI o NIE
            if (input.id === 'dniNie' && valor !== '' && !validarDniNie(valor)) {
                e.preventDefault(); 
                mostrarError(input, 'Por favor, introduce DNI/NIE válido. Y asegúrese de poner las letras en mayúsculas.');
            }

            // Validar el campo de cuenta (radio buttons)
            if (input.name === 'cuenta' && !document.querySelector('input[name="cuenta"]:checked')) {
                e.preventDefault(); 
                const tipoCuentaDiv = document.querySelector('#cuentaradio');
                mostrarError(tipoCuentaDiv, 'Por favor, selecciona un tipo de cuenta (Particular o Empresa).');
            }
        });

        // Validar al menos dos aficiones seleccionadas
        const checkboxes = document.querySelectorAll('#aficioncheck input[type="checkbox"]');

        const seleccionados = Array.from(checkboxes).filter(checkbox => checkbox.checked);

        if (seleccionados.length < 2) {
            e.preventDefault(); 
            const errorDiv = document.querySelector('#aficioncheck');
            mostrarError(errorDiv, 'Por favor, selecciona al menos dos aficiones.');
        } else {
            // Crear campo oculto para enviar aficiones seleccionadas
            const aficionesSeleccionadas = seleccionados.map(checkbox => checkbox.value);
            const aficionesInput = document.createElement('input');
            aficionesInput.type = 'hidden';
            aficionesInput.name = 'aficiones';
            aficionesInput.value = aficionesSeleccionadas.join('&');
            DOM.formulario.appendChild(aficionesInput);
        }

    });
    // --------------------------- FUNCIONES ---------------------------

    /* Muestra el mensaje de error debajo de un campo */
    function mostrarError(input, mensaje) {
        const error = document.createElement('span');
        error.classList.add('error-message');
        error.textContent = mensaje;
        input.parentNode.insertBefore(error, input.nextSibling); // Inserta el mensaje justo después del campo
    }

    /* Valida el formato del número de teléfono */
    function validarTelefono(telefono) {
        const regex = /(\+?[0-9]{1,4}\s?)?(\(?\d{3}\)?[\s.-]?)?[\d\s.-]{7,10}/;
        return regex.test(telefono);
    }

    /* Valida el formato del código postal */
    function validarCodigoPostal(codigoPostal) {
        const regex = /^[0-9]{5}$/;
        return regex.test(codigoPostal);
    }

    // Pre-fill the postal code input with '38'
    const codigoPostalInput = document.getElementById('codigoPostal');
    if (codigoPostalInput) {
        codigoPostalInput.value = '38';
        codigoPostalInput.addEventListener('input', function () {
            if (!this.value.startsWith('38')) {
                this.value = '38' + this.value.slice(2);
            }
        });
    }

    /* Valida el formato del DNI o NIE */
    function validarDniNie(valor) {
        const dniRegex = /^[0-9]{8}[A-Za-z]$/;
        const nieRegex = /^[XYZxyz][0-9]{7}[A-Za-z]$/;
        return dniRegex.test(valor) || nieRegex.test(valor);
    }

    /*Alterna la visibilidad de la contraseña*/
    function toggleVisibilidadContraseña() {
        DOM.password.type = this.checked ? 'text' : 'password';
    }


    // Actualiza contadores de texto
    // ---- Esto se podria hacer tambien con keydown y change en lugar de input
    DOM.titulo.addEventListener('input', function () {
        actualizarContador(this, 'contadorTitulo');
    });
    DOM.descripcion.addEventListener('input', function () {
        actualizarContador(this, 'contadorDescripcion');
    });

    /*Actualiza el contador de caracteres debajo del input*/
    function actualizarContador(input, idContador) {
        const contador = document.getElementById(idContador);
        contador.textContent = `${input.value.length}/${input.maxLength || input.minLength} caracteres`;
    }
});
