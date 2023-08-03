const form = document.querySelector("#register_psychologist_form");

form.addEventListener("submit", validarForm);

const onlyNumbersRegex = /^\d+$/;

function validarForm(e) {
    e.preventDefault();
    const numeroEmpleado = document.querySelector("#numeroEmpleado_form3").value;
    const nombre = document.querySelector("#nombre_form3").value;
    const apellidoPaterno = document.querySelector("#apellidoPaterno_form3").value;
    const apellidoMaterno = document.querySelector("#apellidoMaterno_form3").value;
    const username = document.querySelector("#username_form3").value;
    const password = document.querySelector("#password_form3").value;

    if (numeroEmpleado === "" || nombre === "" || apellidoPaterno === "" || apellidoMaterno === "" || username === "" || password === "") {
        console.log("Todos los formularios son obligatorios");
    } else if (password.length < 6) {
        console.log("La contraseña debe tener al menos 6 caracteres");
    } else if (username.length > 15 || password.length > 15) {
        console.log("El usuario o contraseña sobrepasa el limite de caracteres");
    } else if (onlyNumbersRegex.test(username)) {
        console.log("El usuario solo contiene numeros");
    } else {
        enviarFormulario();
    }
}

function enviarFormulario() {

    const data = {
        numeroEmpleado: document.querySelector("#numeroEmpleado_form3").value,
        nombre: document.querySelector("#nombre_form3").value,
        apellidoPaterno: document.querySelector("#apellidoPaterno_form3").value,
        apellidoMaterno: document.querySelector("#apellidoMaterno_form3").value,
        username: document.querySelector("#username_form3").value,
        password: document.querySelector("#password_form3").value,
    };

    fetch('http://localhost:4000/api/register-psychologist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                swal({
                    text: `${data.error}`,
                    button: "Cerrar"
                });
            } else {
                swal({
                    text: `${data.message}`,
                    button: "Aceptar"
                });
                form.reset();
            }

        })
        .catch(error => {
            console.error(error);
        });
}


const fileInput = document.querySelector("#input_excel_psychologist");
fileInput.addEventListener("change", handleFileUpload);

function handleFileUpload() {
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append("file", file);

    fetch("http://localhost:4000/api/upload/excel/psychologist", {
        method: "POST",
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                swal({
                    title: "Error!",
                    text: data.error,
                    icon: "error",
                    button: "Cerrar"
                });
                fileInput.value = "";
            } else {
                swal({
                    title: "Correcto!",
                    text: data.message,
                    icon: "success",
                    buttons: false,
                    timer: 1000,
                });

                fileInput.value = "";
            }
        })
        .catch(error => {
            console.log(error);
        });
}
