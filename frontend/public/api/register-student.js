import { addUserAlert } from "../funciones/alert.js";

const form = document.querySelector("#register_student_form");

form.addEventListener("submit", validarStudentForm);

const onlyNumbersRegex = /^\d+$/;

function validarStudentForm(e) {
  e.preventDefault();
  const matricula = document.querySelector("#matricula").value;
  const nombre = document.querySelector("#nombre").value
  const apellidoPaterno = document.querySelector("#apellidoPaterno").value;
  const apellidoMaterno = document.querySelector("#apellidoMaterno").value;
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;

  if (matricula === "" || nombre === "" || apellidoPaterno === "" || apellidoMaterno === "" || username === "" || password === "") {
    addUserAlert("Todos los campos son obligatorios", "student");
  }else if (matricula > 10){
    addUserAlert("El campo Matrícula no puede tener mas de 10 caracteres", "student")
  } else if (password.length < 6) {
     addUserAlert("La contraseña debe tener al menos 6 caracteres","student");
  } else if (username.length > 25 || password.length > 25) {
     addUserAlert("El usuario o contraseña sobrepasa el limite de caracteres","student");
  } else if (onlyNumbersRegex.test(username)) {
     addUserAlert("El usuario solo contiene numeros","student");
  } else {
    enviarFormulario();
  }
}

function enviarFormulario() {
  const data = {
    matricula: document.querySelector("#matricula").value,
    nombre: document.querySelector("#nombre").value,
    apellidoPaterno: document.querySelector("#apellidoPaterno").value,
    apellidoMaterno: document.querySelector("#apellidoMaterno").value,
    username: document.querySelector("#username").value,
    password: document.querySelector("#password").value,
  };

  console.log(data)

  fetch('http://localhost:4000/api/register-student', {
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
          buttons: false,
          timer: 2000
        });
        form.reset();
      }

    })
    .catch(error => {
      console.error(error);
    });
}


const fileInput = document.querySelector("#input_excel_student");
const loader = document.getElementById("loader");

fileInput.addEventListener("change", handleFileUpload);

function handleFileUpload() {
  const file = fileInput.files[0];

  const formData = new FormData();
  formData.append("file", file);

  // Show the loader
  loader.style.display = "block";

  fetch("http://localhost:4000/api/upload/excel/students", {
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
          timer: 1000
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

