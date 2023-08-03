const form = document.querySelector("#register_student_form");



form.addEventListener("submit", validarForm);

const onlyNumbersRegex = /^\d+$/;

function validarForm(e) {
  e.preventDefault();
  const matricula = document.querySelector("#matricula").value;
  const nombre = document.querySelector("#nombre").value
  const apellidoPaterno = document.querySelector("#apellidoPaterno").value;
  const apellidoMaterno = document.querySelector("#apellidoMaterno").value;
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;

  if (matricula === "" || nombre === "" || apellidoPaterno === "" || apellidoMaterno === "" || username === "" || password === "") {
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
fileInput.addEventListener("change", handleFileUpload);

function handleFileUpload() {
  const file = fileInput.files[0];

  const formData = new FormData();
  formData.append("file", file);

  fetch("http://localhost:4000/api/upload/excel/students", {
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
          timer: 1000
        });

        fileInput.value = "";
      }
    })
    .catch(error => {
      console.log(error);
    });
}
