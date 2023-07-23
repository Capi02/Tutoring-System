import { showAlert } from "../funciones/alert.js";

const onlyNumbersRegex = /^\d+$/;
const buttonForm = document.querySelector(".button");

buttonForm.addEventListener("click", validarForm);

function validarForm() {
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;

  if (username === "" || password === "") {
    showAlert("Todos los formularios son obligatorios");
  }else if(password.length < 6) {
    showAlert("La contraseña debe tener al menos 6 caracteres");
  }else if(username.length > 15 || password.length > 15 ){
    showAlert("El usuario o contraseña sobrepasa el limite de caracteres");
  }else if(onlyNumbersRegex.test(username)){
    showAlert("El usuario solo contiene numeros");
  }else {
    enviarFormulario();
  }
}

function enviarFormulario() {
  const data = {
    username: document.querySelector("#username").value,
    password: document.querySelector("#password").value
  };

  fetch('http://localhost:4000/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => {
      if(data.error){
        showAlert(data.error)
      }else{
        window.location.href = "/";
      }
     
    })
    .catch(error => {
      // Aquí puedes manejar cualquier error de la solicitud
      console.error(error);
    });
}