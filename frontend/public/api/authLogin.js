import { showAlert } from "../funciones/alert.js";

const onlyNumbersRegex = /^\d+$/;

const botonLogin = document.querySelector("#botonLogin");
botonLogin.addEventListener("click", validarFormularioLogin);

function validarFormularioLogin(e) {
  e.preventDefault();

  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;

  if (username === "" || password === "") {
    showAlert("Todos los campos son obligatorios")
  }else if(password.length < 6) {
    showAlert("La contraseña debe tener al menos 6 caracteres");
  }else if(onlyNumbersRegex.test(username)){
    showAlert("El username solo contiene numeros")
  } else {
    enviarFormulario(username, password);
  }
}

function enviarFormulario(username, password) {
  const data = {
    username,
    password,
  };
  fetch("http://localhost:4000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if(data.error){
        showAlert(data.error)
      }else{
        window.location.href = "/";
      }
     
    })
    .catch((error) => {
      console.log(error.error)
    });
}

