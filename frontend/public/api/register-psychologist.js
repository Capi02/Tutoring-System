import { addUserAlert } from "../funciones/alert.js";

const form = document.querySelector("#register_psychologist_form");

form.addEventListener("submit", validarPsychologistForm);

const onlyNumbersRegex = /^\d+$/;

function validarPsychologistForm(e) {
    e.preventDefault();
    console.log("validarPsychologistForm boton")
    const numeroEmpleado = document.querySelector("#numeroEmpleado_form3").value;
    const nombre = document.querySelector("#nombre_form3").value;
    const apellidoPaterno = document.querySelector("#apellidoPaterno_form3").value;
    const apellidoMaterno = document.querySelector("#apellidoMaterno_form3").value;
    const username = document.querySelector("#username_form3").value;
    const password = document.querySelector("#password_form3").value;

    if (numeroEmpleado === "" || nombre === "" || apellidoPaterno === "" || apellidoMaterno === "" || username === "" || password === "") {
        addUserAlert("Todos los campos son obligatorios", "psychologist");
    } else if (password.length < 6) {
        addUserAlert("La contraseña debe tener al menos 6 caracteres", "psychologist");
    } else if (username.length > 15 || password.length > 15) {
        addUserAlert("El usuario o contraseña sobrepasa el limite de caracteres", "psychologist");
    } else if (onlyNumbersRegex.test(username)) {
        addUserAlert("El usuario solo contiene numeros", "psychologist");
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
const loader = document.getElementById("loader");
fileInput.addEventListener("change", handleFileUpload);

function handleFileUpload() {
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append("file", file);

    // Show the loader
    loader.style.display = "block";

    fetch("http://localhost:4000/api/upload/excel/psychologist", {
        method: "POST",
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
            // Hide the loader
            loader.style.display = "none";

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
            // Hide the loader in case of an error
            loader.style.display = "none";
        });
}
