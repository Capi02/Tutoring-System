// Obtener referencia al formulario y elementos de entrada
const form = document.querySelector('.change_password_form');
const oldPasswordInput = document.querySelector('[name="oldPassword"]');
const newPasswordInput = document.querySelector('[name="newPassword"]');
const username = document.querySelector(".username_hidden").value;

// Manejar el envío del formulario
form.addEventListener('submit', validarForm)

async function validarForm(e) {
    e.preventDefault();

    if (oldPasswordInput === "" || newPasswordInput === "") {
        console.log("Todos los campos son obligatorios")
    } else {
        updatePassword(oldPasswordInput.value, newPasswordInput.value, username);
    }
}

async function updatePassword(oldPassword, newPassword) {

    const formData = {
        oldPassword,
        newPassword,
        username
    }

    console.log(formData)

    try {
        const response = await fetch(`http://localhost:4000/api/update-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (data.error) {
            window.alert(data.error);
        } else {
            window.alert(data.message);
            form.reset();
        }

    } catch (error) {
        console.error('Error en la petición fetch:', error);

    }
}

