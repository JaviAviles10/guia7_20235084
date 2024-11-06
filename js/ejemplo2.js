// ACCEDIENDO A LA REFERENCIA DEL FORMULARIO QUE TENDRA LOS NUEVOS ELEMENTOS
const newForm = document.getElementById("idNewForm");

// ACCEDIENDO A LA REFERENCIA DE BOTONES
const buttonCrear = document.getElementById("idBtnCrear");
const buttonAddElemento = document.getElementById("idBtnAddElemento");

// ACCEDIENDO AL VALOR DEL SELECT PARA DETERMINAR EL TIPO DE ELEMENTO A CREAR
const cmbElemento = document.getElementById("idCmbElemento");

// ACCEDIENDO A LOS CONTROLES DEL MODAL
const tituloElemento = document.getElementById("idTituloElemento");
const nombreElemento = document.getElementById("idNombreElemento");

// CREANDO MODAL CON BOOTSTRAP
const modal = new bootstrap.Modal(document.getElementById("idModal"), {});

// AGREGANDO FUNCIONES
const vericarTipoElemento = function () {
    let elemento = cmbElemento.value;
    // validando que se haya seleccionado un elemento
    if (elemento != "") {
        // Metodo perteneciente al modal de bootstrap
        modal.show();
    } else {
        alert("Debe seleccionar el elemento que se creara");
    }
};

// AGREGANDO EVENTO CLIC A LOS BOTONES
buttonCrear.onclick = () => {
    vericarTipoElemento();
};

buttonAddElemento.onclick = () => {
    if (nombreElemento.value != "" && tituloElemento.value != "") {
        let elemento = cmbElemento.value;

        if (elemento == "select") {
            newSelect();
        } else if (elemento == "radio" || elemento == "checkbox") {
            newRadioCheckbox(elemento);
        } else {
            newInput(elemento);
        }
    } else {
        alert("Faltan campos por completar");
    }
};

// Agregando evento para el modal de bootstrap
document.getElementById("idModal").addEventListener("shown.bs.modal", () => {
    // Limpiando campos para los nuevos elementos
    tituloElemento.value = "";
    nombreElemento.value = "";
    // inicializando puntero en el campo del titulo para el control
    tituloElemento.focus();
});

// Validaciones adicionales para el formulario
const formulario = document.forms["frmRegistro"];
const button = formulario.elements["btnRegistro"];
const bodyModal = document.getElementById("idBodyModal");

// Validación de campos vacíos
function validarCamposVacios() {
    for (let elemento of formulario.elements) {
        if ((elemento.type === "text" || elemento.type === "date" || elemento.type === "email" || elemento.type === "password") && elemento.value.trim() === "") {
            return false;
        }
    }
    return true;
}

// Validación de fecha de nacimiento
function validarFechaNacimiento() {
    const fechaNacimiento = formulario.elements["idFechaNac"].value;
    const fechaActual = new Date().toISOString().split("T")[0];
    return fechaNacimiento <= fechaActual;
}

// Validación de correo electrónico con expresión regular
function validarCorreo() {
    const email = formulario.elements["idCorreo"].value;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
}

// Validación de contraseñas iguales
function validarContrasenas() {
    const password = formulario.elements["idPassword"].value;
    const passwordRepetir = formulario.elements["idPasswordRepetir"].value;
    return password === passwordRepetir;
}

// Validación de selección de intereses
function validarIntereses() {
    return formulario.elements["idCkProgramacion"].checked || formulario.elements["idCkBD"].checked || formulario.elements["idCkRedes"].checked || formulario.elements["idCkSeguridad"].checked;
}

// Validación de selección de carrera
function validarCarrera() {
    const carreras = formulario.elements["idRdCarrera"];
    return Array.from(carreras).some(radio => radio.checked);
}

// Validación de país de origen
function validarPais() {
    const pais = formulario.elements["idCmPais"].value;
    return pais !== "Seleccione una opcion";
}

// Función principal de validación
function validarFormulario() {
    if (!validarCamposVacios()) {
        alert("Todos los campos deben estar llenos.");
        return false;
    }
    if (!validarFechaNacimiento()) {
        alert("La fecha de nacimiento no puede ser posterior a la fecha actual.");
        return false;
    }
    if (!validarCorreo()) {
        alert("Por favor ingrese un correo electrónico válido.");
        return false;
    }
    if (!validarContrasenas()) {
        alert("Las contraseñas no coinciden.");
        return false;
    }
    if (!validarIntereses()) {
        alert("Debe seleccionar al menos un interés.");
        return false;
    }
    if (!validarCarrera()) {
        alert("Debe seleccionar una carrera.");
        return false;
    }
    if (!validarPais()) {
        alert("Debe seleccionar un país de origen.");
        return false;
    }
    return true;
}

// Función para mostrar la información en el modal en una tabla
function mostrarInfoEnModal() {
    const tabla = document.createElement("table");
    tabla.className = "table table-striped";

    const campos = [
        { nombre: "Nombres", valor: formulario.elements["idNombre"].value },
        { nombre: "Apellidos", valor: formulario.elements["idApellidos"].value },
        { nombre: "Fecha Nacimiento", valor: formulario.elements["idFechaNac"].value },
        { nombre: "Correo", valor: formulario.elements["idCorreo"].value },
        { nombre: "Carrera", valor: formulario.elements["idRdCarrera"].value },
        { nombre: "País de Origen", valor: formulario.elements["idCmPais"].value },
        { nombre: "Intereses", valor: obtenerInteresesSeleccionados() }
    ];

    campos.forEach(campo => {
        const fila = document.createElement("tr");
        const celdaNombre = document.createElement("td");
        const celdaValor = document.createElement("td");

        celdaNombre.textContent = campo.nombre;
        celdaValor.textContent = campo.valor;
        fila.appendChild(celdaNombre);
        fila.appendChild(celdaValor);
        tabla.appendChild(fila);
    });

    // Limpia el modal y añade la tabla
    while (bodyModal.firstChild) {
        bodyModal.removeChild(bodyModal.firstChild);
    }
    bodyModal.appendChild(tabla);
    modal.show();
}

// Función para obtener intereses seleccionados
function obtenerInteresesSeleccionados() {
    const intereses = [];
    if (formulario.elements["idCkProgramacion"].checked) intereses.push("Programación");
    if (formulario.elements["idCkBD"].checked) intereses.push("Base de Datos");
    if (formulario.elements["idCkRedes"].checked) intereses.push("Inteligencia Artificial");
    if (formulario.elements["idCkSeguridad"].checked) intereses.push("Seguridad Informática");
    return intereses.join(", ");
}

// Evento de clic en el botón de envío
button.addEventListener("click", function () {
    if (validarFormulario()) {
        mostrarInfoEnModal();
    }
});
