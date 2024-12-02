document.addEventListener('DOMContentLoaded', function () {
    const selectNacimiento = document.getElementById('nacimiento');
    const year = new Date().getFullYear();

    // Genera años desde 1900 hasta el actual
    for (let i = 1900; i <= year; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectNacimiento.appendChild(option);
    }

    // Actualiza contadores de texto
    // ---- Esto se podria hacer tambien con keydown y change en lugar de input
    document.getElementById('titulo').addEventListener('input', function () {
        actualizarContador(this, 'contadorTitulo');
    });
    document.getElementById('descripcion').addEventListener('input', function () {
        actualizarContador(this, 'contadorDescripcion');
    });

    // Mostrar/ocultar contraseña
    document.getElementById('mostrarContraseña').addEventListener('change', toggleVisibilidadContraseña);

    // --------------------------- VALIDACIÓN ---------------------------

    // Validar el formulario al enviarlo
    const formulario = document.getElementById('formulario');
    formulario.addEventListener('submit', function(e) {
        e.preventDefault();  // Evitar el envío del formulario

        let esValido = true;
        const inputs = document.querySelectorAll('input, select, textarea');
        
        // Limpiar errores previos
        document.querySelectorAll('.error-message').forEach(message => message.remove());
        
        // Validación de cada campo
        inputs.forEach(input => {
            const valor = input.value.trim();
            
            // Validar campos requeridos
            if (input.hasAttribute('required') && !valor) {
                esValido = false;
                mostrarError(input, 'Este campo es obligatorio.');
            }
            
            // Validar formato de teléfono
            if (input.type === 'tel' && valor !== '' && !validarTelefono(valor)) {
                esValido = false;
                mostrarError(input, 'Por favor, introduce un número de teléfono válido.');
            }

            // Validar formato del código postal
            if (input.id === 'codigoPostal' && valor !== '' && !validarCodigoPostal(valor)) {
                esValido = false;
                mostrarError(input, 'Por favor, introduce un código postal válido.');
            }

            // Validar formato del DNI o NIE
            if (input.id === 'dni' && valor !== '' && !validarDniNie(valor)) {
                esValido = false;
                mostrarError(input, 'Por favor, introduce DNI/NIE válido. Y asegúrese de poner las letras en mayúsculas.');
            }

            // Validar el campo de cuenta (radio buttons)
            if (input.name === 'cuenta' && !document.querySelector('input[name="cuenta"]:checked')) {
                esValido = false;
                mostrarError(input, 'Por favor, selecciona un tipo de cuenta (Particular o Empresa).');
            }

            // Validar que al menos una afición sea seleccionada
            if (input.name === 'aficiones[]' && input.checked === false) {
                const aficiones = document.querySelectorAll('input[name="aficiones[]"]:checked');
                if (aficiones.length === 0) {
                    esValido = false;
                    mostrarError(input, 'Por favor, selecciona al menos una afición.');
                }
            }

            // Validación de la longitud mínima de la contraseña
            if (input.id === 'password' && valor !== '' && valor.length < 5) {
                esValido = false;
                mostrarError(input, 'La contraseña debe tener al menos 5 caracteres.');
            }
        });

        // Si todo es válido, enviar el formulario
        if (esValido) {
            formulario.submit(); // Se envía el formulario manualmente
        }
    });

    // --------------------------- FUNCIONES ---------------------------

    /*Muestra el mensaje de error debajo de un campo*/
    function mostrarError(input, mensaje) {
        const error = document.createElement('span');
        error.classList.add('error-message');
        error.textContent = mensaje;
        input.parentNode.insertBefore(error, input.nextSibling); // Inserta el mensaje justo después del campo
    }

    /*Valida el formato del número de teléfono*/
    function validarTelefono(telefono) {
        const regex = /(\+?[0-9]{1,4}\s?)?(\(?\d{3}\)?[\s.-]?)?[\d\s.-]{7,10}/; 
        return regex.test(telefono);
    }

    /*Valida el formato del código postal*/
    function validarCodigoPostal(codigoPostal) {
        const regex = /^[0-9]{5,5}$/; 
        return regex.test(codigoPostal);
    }

    /*Valida el formato del DNI o NIE*/
    function validarDniNie(valor) {
        const dniRegex = /^[0-9]{8}[A-Z]$/;
        const nieRegex = /^[XYZ][0-9]{7}[A-Z]$/;
        return dniRegex.test(valor) || nieRegex.test(valor);
    }

    /*Alterna la visibilidad de la contraseña*/
    function toggleVisibilidadContraseña() {
        const passwordInput = document.getElementById('password');
        passwordInput.type = this.checked ? 'text' : 'password';
    }

    /*Actualiza el contador de caracteres debajo del input*/
    function actualizarContador(input, idContador) {
        const contador = document.getElementById(idContador);
        contador.textContent = `${input.value.length}/${input.maxLength || input.minLength} caracteres`;
    }
});
