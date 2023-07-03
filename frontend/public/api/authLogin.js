
const botonLogin = document.querySelector("#botonLogin")
botonLogin.addEventListener('click', validarFormularioLogin)

function validarFormularioLogin(e) {
    e.preventDefault();

    const folio = document.querySelector("#folio").value;
    const password = document.querySelector("#password").value;



    if (folio === "" || password === "") {
        console.log("formularios vacios")
    } else {
        enviarFormulario(folio, password);
    }
}

function enviarFormulario(folio, password) {

    const data = {
        folio,
        password
    }
    fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)


    })
        .then(response => response.json())
        .then(data => {
            // Aquí puedes manejar la respuesta del servidor
            console.log(data);
        })
        .catch(error => {
            console.log(error);
        })

    window.location.href = "http://localhost:4000/"
}
