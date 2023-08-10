document.addEventListener('DOMContentLoaded', function () {
    getPsychologist();
    btnEdit();
    btnDelete();
});


async function getPsychologist() {
    const res = await fetch("http://localhost:4000/api/psychologists");
    const data = await res.json();
    psychologistTable(data)
}

function psychologistTable(psychologists) {
    let table = new DataTable("#psychologist_table", {
        responsive: true,
        data: psychologists,
        columns: [
            { data: 'numeroEmpleado' },
            { data: "apellidoPaterno" },
            { data: "apellidoMaterno" },
            { data: 'nombre' },
            { data: 'username' },
            { data: 'role' },
            {
                data: null,
                render: function (data, type, row) {
                    return `
            <button class="psychologist_edit_button btn_edit" data-id="${data.id}">Editar</button>
            <button class="psychologist_delete_button btn_delete" data-id="${data.id}">Eliminar</button>
          `;
                }
            }
        ],
    });
}

function btnDelete() {
    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('psychologist_delete_button')) {
            const psychologistId = event.target.dataset.id;
           
            deletePsychologist(psychologistId);
        }
    });
}
async function deletePsychologist(id) {
    swal({
        title: "Está seguro?",
        text: "Una vez eliminado, no podrá recuperar el usuario",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then(async (willDelete) => {
        if (willDelete) {
            const res = await fetch(`http://localhost:4000/api/delete/${id}`, {
                method: 'DELETE'
            })
            if (res.ok) {
                swal("El usuario ha sido eliminado correctamente", {
                    icon: "success",
                    buttons: false,
                    timer: 1000,
                });
            }
        }
    })
}

const overlay = document.querySelector("#overlay");

function btnEdit() {
    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("psychologist_edit_button")) {
            const overlay = document.querySelector("#overlay");
            overlay.style.display = "block"
            const psychologistId = e.target.dataset.id;
            setPsychologistInformation(psychologistId)
            closeOverlay()
        }
    })
}
function closeOverlay() {
    const btnCancel = document.querySelector(".psychologist_cancel_button");
    btnCancel.addEventListener("click", () => {
        overlay.style.display = "none";

    })
}

async function setPsychologistInformation(id) {
    try {
        const res = await fetch(`http://localhost:4000/api/psychologist/${id}`, {
            method: "GET"
        });
        const data = await res.json();
        console.log(data.psychologistInformation)

        const { numeroEmpleado, nombre, apellidoPaterno, apellidoMaterno, username, password } = data.psychologistInformation;

        document.querySelector("#edit_input_numeroEmpleado").value = numeroEmpleado;
        document.querySelector("#edit_input_nombre").value = nombre;
        document.querySelector("#edit_input_apellidoPaterno").value = apellidoPaterno;
        document.querySelector("#edit_input_apellidoMaterno").value = apellidoMaterno;
        document.querySelector("#edit_input_username").value = username;
        document.querySelector("#edit_input_password").value = password;

        updateInformation(id);

    } catch (error) {
        console.error(error);
    }
}

async function updateInformation(id) {
    const save_changes_button = document.querySelector(".save_edit_button");
    save_changes_button.addEventListener("click", () => {

        const newPsychologistInformation = {
            numeroEmpleado: document.querySelector("#edit_input_numeroEmpleado").value,
            nombre: document.querySelector("#edit_input_nombre").value,
            apellidoPaterno: document.querySelector("#edit_input_apellidoPaterno").value,
            apellidoMaterno: document.querySelector("#edit_input_apellidoMaterno").value,
            username: document.querySelector("#edit_input_username").value,
            password: document.querySelector("#edit_input_password").value,
        }
        sendUpdateInformation(newPsychologistInformation, id);
    })
}

async function sendUpdateInformation(newInfo, id) {
    try {
        const res = await fetch(`http://localhost:4000/api/update-psychologist/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newInfo),
        })
        const data = await res.json();
        if (data.error) {
            swal({
                title: "Error!",
                text: data.error,
                icon: "error",
                button: "Cerrar"
            });
        } else {
            swal({
                title: "Correcto!",
                text: data.message,
                icon: "success",
                buttons: false,
                timer: 1000,
            });
            overlay.style.display = "none";
        }
    } catch (error) {
        console.log(error);
    }
}


