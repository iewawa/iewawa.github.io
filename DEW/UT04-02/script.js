document.addEventListener('DOMContentLoaded', function () {
    const selectNacimiento = document.getElementById('anioNacimiento');
    const year = 2010;
    const form = document.getElementById('userForm');
    const mensajesList = document.getElementById('mensajes');
    const mostrarContrasenaCheckbox = document.getElementById('mostrarContrasena');
    const contrasenaInput = document.getElementById('contrasena');
    const inputs = form.querySelectorAll('input, select, textarea');

    // Muestra mensajes de validación por defecto en el div de la derecha en la lista #mensajes
    inputs.forEach(input => {
        input.addEventListener('invalid', function (e) {
            e.preventDefault(); 
            mostrarMensajesPorDefecto(e.target);
        });

        input.addEventListener('input', function () {
            if (input.checkValidity()) {
                eliminarMensaje(input);
            }
        });
    });

    function mostrarMensajesPorDefecto(input) {
        const mensajes = mensajesList.querySelectorAll('li');

        const mensaje = input.validationMessage;
        if (mensaje) {
            mensajes.forEach(mensaje => {
                if (mensaje.textContent.includes(input.name)) {
                    mensaje.remove();
                }
            });

            const li = document.createElement('li');
            li.textContent = `${input.name}: ${mensaje}`;
            mensajesList.appendChild(li);
        }
    }

    function eliminarMensaje(input) {
        const mensajes = mensajesList.querySelectorAll('li');
        mensajes.forEach(mensaje => {
            if (mensaje.textContent.includes(input.name)) {
                mensaje.remove();
            }
        });
    }

    // Muestra/Oculta contraseña
    mostrarContrasenaCheckbox.addEventListener('change', mostrarContrasena);

    // Genera años desde 1900 hasta el actual
    for (let i = 1920; i <= year; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectNacimiento.appendChild(option);
    }

    // Actualiza contadores de texto
    document.getElementById('publicacionTitulo').addEventListener('input', function () {
        actualizarContador(this, 'contadorTitulo');
    });
    document.getElementById('publicacionDescripcion').addEventListener('input', function () {
        actualizarContador(this, 'contadorDescripcion');
    });

    // Valida al enviar el formulario
    form.addEventListener('submit', function (e) {
        let esValido = true;
        e.preventDefault(); // Previene el envío automático
        const inputs = document.querySelectorAll('input, select, textarea');
        // Limpia errores previos
        limpiarMensajes();

        // Valida cada campo específico
        inputs.forEach(input => {
            const valor = input.value.trim();
            
            // Valida campos requeridos
            if (input.hasAttribute('required') && !valor) {
                esValido = false;
                mostrarError(input, 'Este campo es obligatorio.');
            }

            // Valida la longitud de la contraseña
            if (input.type === 'password' && valor.length !== 8) {
                esValido = false;
                mostrarError(input, 'La contraseña debe tener exactamente 8 caracteres numéricos.');
            }

            // Valida formato de teléfono
            if (input.id === 'telefono' && valor && !validarTelefono(valor)) {
                esValido = false;
                mostrarError(input, 'Formato de teléfono inválido.');
            }

            // Valida formato del código postal
            if (input.id === 'codigoPostal' && valor && !validarCodigoPostal(valor)) {
                esValido = false;
                mostrarError(input, 'Código postal no válido. Debe empezar con "38".');
            }

            // Valida el campo de cuenta (radio buttons)
            if (input.name === 'CuentaComo' && !document.querySelector('input[name="CuentaComo"]:checked')) {
                const tipoCuentaDiv = document.querySelector('#cuentaradio');
                mostrarError(tipoCuentaDiv, 'Por favor, selecciona un tipo de cuenta (Particular o Empresa).');
            }

            // Valida formato del DNI o NIE
            if (input.id === 'dniNie' && valor && !validarDniNie(valor)) {
                esValido = false;
                mostrarError(input, 'DNI/NIE inválido.');
            }
        });

        // Valida al menos dos aficiones seleccionadas
        const checkboxes = document.querySelectorAll('#aficiones input[type="checkbox"]');
        const seleccionados = Array.from(checkboxes).filter(checkbox => checkbox.checked);

        if (seleccionados.length < 2) {
            esValido = false; // Marca formulario como no válido
            e.preventDefault();
            const errorDiv = document.querySelector('#aficiones');
            mostrarError(errorDiv, 'Por favor, selecciona al menos dos aficiones.');
        } else {
            // Crea campo oculto para enviar aficiones seleccionadas
            const aficionesSeleccionadas = seleccionados.map(checkbox => checkbox.value).join(',');
            const aficionesInput = document.createElement('input');
            aficionesInput.type = 'hidden';
            aficionesInput.name = 'Aficiones';
            aficionesInput.value = aficionesSeleccionadas;
            form.appendChild(aficionesInput); 
        }

        if (esValido) {
            form.submit(); // Envía formulario manualmente
        }
    });

    // -------------------- Funciones --------------------

    /*Alterna la visibilidad de la contraseña*/
    function mostrarContrasena(event) {
        contrasenaInput.type = event.target.checked ? 'text' : 'password';
    }

    function mostrarError(input, mensaje) {
        // Elimina cualquier mensaje previo debajo del input
        const existingError = input.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
    
        // Crea el mensaje debajo del input
        const error = document.createElement('span');
        error.classList.add('error-message');
        error.textContent = mensaje;
        input.parentNode.appendChild(error); // Coloca al final del contenedor del input
    }
    
    function limpiarMensajes() {
        const mensajes = document.querySelectorAll('.error-message');
        mensajes.forEach(msg => msg.remove());
    }

    /*Valida el formato del número de teléfono*/
    function validarTelefono(telefono) {
        const regex = /^\(\+34\)\d{9}$/;
        return regex.test(telefono);
    }

    /*Valida el formato del código postal*/
    function validarCodigoPostal(codigoPostal) {
        const regex = /^38\d{3}$/;
        return regex.test(codigoPostal);
    }

    /*Valida el formato del DNI o NIE*/
    function validarDniNie(dniNie) {
        const regexDni = /^[0-9]{8}[A-Za-z]$/;
        const regexNie = /^[XYZxyz][0-9]{7}[A-Za-z]$/;
        return regexDni.test(dniNie) || regexNie.test(dniNie);
    }

    /*Actualiza el contador de caracteres debajo del input*/
    function actualizarContador(input, idContador) {
        const contador = document.getElementById(idContador);
        contador.textContent = `${input.value.length}/${input.maxLength || input.minLength} caracteres`;
    }
});
