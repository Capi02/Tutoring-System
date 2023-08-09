
import { addUserAlert } from "../funciones/alert.js";

const form = document.querySelector("#register_teacher_form");

form.addEventListener("submit", validarTeacherForm);

const onlyNumbersRegex = /^\d+$/;

function validarTeacherForm(e) {
    e.preventDefault();
    const numeroEmpleado = document.querySelector("#numeroEmpleado_form2").value;
    const nombre = document.querySelector("#nombre_form2").value;
    const apellidoPaterno = document.querySelector("#apellidoPaterno_form2").value;
    const apellidoMaterno = document.querySelector("#apellidoMaterno_form2").value;
    const username = document.querySelector("#username_form2").value;
    const password = document.querySelector("#password_form2").value;

    if (numeroEmpleado === "" || nombre === "" || apellidoPaterno === "" || apellidoMaterno === "" || username === "" || password === "") {
        addUserAlert("Todos los campos son obligatorios", "teacher");
    } else if (password.length < 6) {
        addUserAlert("La contraseña debe tener al menos 6 caracteres", "teacher");
    } else if (username.length > 15 || password.length > 15) {
        addUserAlert("El usuario o contraseña sobrepasa el limite de caracteres", "teacher");
    } else if (onlyNumbersRegex.test(username)) {
        addUserAlert("El usuario solo contiene numeros", "teacher");
    } else {
        enviarFormulario();
    }
}

function enviarFormulario() {

    const data = {
        numeroEmpleado: document.querySelector("#numeroEmpleado_form2").value,
        nombre: document.querySelector("#nombre_form2").value,
        apellidoPaterno: document.querySelector("#apellidoPaterno_form2").value,
        apellidoMaterno: document.querySelector("#apellidoMaterno_form2").value,
        username: document.querySelector("#username_form2").value,
        password: document.querySelector("#password_form2").value,
    };

    fetch('http://localhost:4000/api/register/teacher', {
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


const fileInput = document.querySelector("#input_excel_teacher");
const loader = document.getElementById("loader");
fileInput.addEventListener("change", handleFileUpload);

function handleFileUpload() {
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append("file", file);

    // Show the loader
    loader.style.display = "block";

    fetch("http://localhost:4000/api/upload/excel/teacher", {
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
                    button: "Aceptar"
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
