const form = document.querySelector("#register_teacher_form");

form.addEventListener("submit", validarForm);

const onlyNumbersRegex = /^\d+$/;

function validarForm(e) {
    e.preventDefault();
    const numeroEmpleado = document.querySelector("#numeroEmpleado_form2").value;
    const nombre = document.querySelector("#nombre_form2").value;
    const apellidoPaterno = document.querySelector("#apellidoPaterno_form2").value;
    const apellidoMaterno = document.querySelector("#apellidoMaterno_form2").value;
    const username = document.querySelector("#username_form2").value;
    const password = document.querySelector("#password_form2").value;

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
        numeroEmpleado: document.querySelector("#numeroEmpleado_form2").value,
        nombre: document.querySelector("#nombre_form2").value,
        apellidoPaterno: document.querySelector("#apellidoPaterno_form2").value,
        apellidoMaterno: document.querySelector("#apellidoMaterno_form2").value,
        username: document.querySelector("#username_form2").value,
        password: document.querySelector("#password_form2").value,
    };

    fetch('http://localhost:4000/api/register-teacher', {
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
fileInput.addEventListener("change", handleFileUpload);

function handleFileUpload() {
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append("file", file);

    fetch("http://localhost:4000/api/upload/excel/teacher", {
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
                    button: "Aceptar"
                });

                fileInput.value = "";
            }
        })
        .catch(error => {
            console.log(error);
        });
}
