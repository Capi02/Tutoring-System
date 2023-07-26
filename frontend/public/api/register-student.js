
const onlyNumbersRegex = /^\d+$/;

const form = document.querySelector("#register_student_form");
form.addEventListener("submit", validarForm);

function validarForm(e) {
  e.preventDefault();
  const name = document.querySelector("#nombre").value;
  const apellidoPaterno = document.querySelector("#apellidoPaterno").value;
  const apellidoMaterno = document.querySelector("#apellidoMaterno").value;
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;

  if (name === "" || apellidoPaterno === "" || apellidoMaterno === "" || username === "" || password === "") {
    console.log("Todos los formularios son obligatorios");
  }else if(password.length < 6) {
    console.log("La contraseña debe tener al menos 6 caracteres");
  }else if(username.length > 15 || password.length > 15 ){
    console.log("El usuario o contraseña sobrepasa el limite de caracteres");
  }else if(onlyNumbersRegex.test(username)){
    console.log("El usuario solo contiene numeros");
  }else {
    enviarFormulario();
  }
}

function enviarFormulario() {
  const data = {
    nombre: document.querySelector("#nombre").value,
    apellidoPaterno:document.querySelector("#apellidoPaterno").value,
    apellidoMaterno: document.querySelector("#apellidoMaterno").value,
    username: document.querySelector("#username").value,
    password: document.querySelector("#password").value
  };

  fetch('http://localhost:4000/api/register-student', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => {
      if(data.error){
        console.log(data.error)
      }else{
        console.log("Usuario creado!")
        form.reset();
      }
     
    })
    .catch(error => {
      // Aquí puedes manejar cualquier error de la solicitud
      console.error(error);
    });
}

// Selecciona el input file por su id
const fileInput = document.querySelector("#input_excel_student");

// Agrega un evento de cambio para el input file
fileInput.addEventListener("change", handleFileUpload);

function handleFileUpload() {
  // Obtén el archivo seleccionado por el usuario
  const file = fileInput.files[0];

  // Crea un objeto FormData para enviar el archivo en la solicitud fetch
  const formData = new FormData();
  formData.append("file", file);

  // Realiza una solicitud fetch al servidor
  fetch("http://localhost:4000/api/upload/excel/students", {
    method: "POST",
    body: formData,
  })
    .then(response => response.json())
    .then(data => {
      if(data.error){
        swal("Error!", `${data.error}`, "error");
      }else{
        swal("Correcto!", `${data.message}`, "success");
      }
      
    })
    .catch(error => {
    
    });
}
