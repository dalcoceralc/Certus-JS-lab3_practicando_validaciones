document.getElementById('miFormulario').addEventListener('submit', function(event) {
	event.preventDefault();
	// Obtener los valores de los campos del formulario
	const campos = [
		'texto', 'password','dni', 'telefono',  'email', 'fecha',
		'telefonoPatron', 'url', 'archivo','terminos', 'genero', 'ciudad', 'mensaje'
	];

	let esValido = true;

	// validamos campo por campo
	campos.forEach(campo => {
		console.log(campo,document.getElementById(campo))
		const elemento = document.getElementById(campo);
		if (elemento) {
			if (!validarCampo(elemento)) {
				esValido = false;
			}
		}
	});

	function validarCampo(elemento) {
    let valido = true;
    const campo = elemento.id;

    if (elemento.hasAttribute('required') && !elemento.value.trim()) {
        mostrarError(campo, 'Este campo es obligatorio.');
        valido = false;
    }
		//validacion secundaria a nivel de js, probar eliminando del elemento <input type="text" id="texto" name="texto" minlength="2" maxlength="10" required="">en el navegador, quitamos minlength="2" maxlength="10" required=" y realizamos nuevamente la validacion dejando vacio el input
		if (!(elemento.value.length!=0)) {
			mostrarError(campo, 'Este campo es obligatorio.');
			valido = false;
		}

    if (elemento.hasAttribute('pattern')) {
        const pattern = new RegExp(elemento.getAttribute('pattern'));
        if (!pattern.test(elemento.value)) {
            mostrarError(campo, 'Formato inválido.');
            valido = false;
        }
    }

    if (elemento.hasAttribute('type') && elemento.type === 'email') {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(elemento.value)) {
            mostrarError(campo, 'Correo electrónico no válido.');
            valido = false;
        }
    }
		//validar checkbox
		if (elemento.type === 'checkbox' && !elemento.checked ) {
			mostrarError(campo, 'Este campo es obligatorio.');
			valido = false;
		}
		//Practicando Validar radio

    return valido;
	}

	function mostrarError(campo, mensaje) {
		document.getElementById(campo + 'Error').textContent = mensaje;
		document.getElementById(campo).classList.add('error-input');
	}
	//Agregar una funcion para limpiar Errores
	
	if (esValido) {
		alert('Formulario enviado correctamente.');
	}
	
});