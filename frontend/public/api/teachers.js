document.addEventListener('DOMContentLoaded', function () {
    getTeachers();
    btnEdit();
    btnDelete();
});


async function getTeachers() {
    const res = await fetch("http://localhost:4000/api/teachers");
    const data = await res.json();
    teachersTable(data)
}

function teachersTable(teachers) {
    let table = new DataTable("#teachers_table", {
        responsive: true,
        data: teachers,
        columns: [
            { data: 'numeroEmpleado' },
            { data: "apellidoPaterno" },
            { data: "apellidoMaterno" },
            { data: 'username' },
            { data: 'password' },
            { data: 'role' },
            {
                data: null,
                render: function (data, type, row) {
                    return `
            <button class="teachers_edit_button btn_edit" data-id="${data.id}">Editar</button>
            <button class="teachers_delete_button btn_delete" data-id="${data.id}">Eliminar</button>
          `;
                }
            }
        ],
    });
}

function btnDelete() {
    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('teachers_delete_button')) {
            const teacherId = event.target.dataset.id;
           
            deletePsychologist(teacherId);
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
        if (e.target.classList.contains("teachers_edit_button")) {
            const overlay = document.querySelector("#overlay");
            overlay.style.display = "block"
            const teacherId = e.target.dataset.id;
            setTeacherInformation(teacherId)
            closeOverlay()
        }
    })
}
function closeOverlay() {
    const btnCancel = document.querySelector(".teacher_cancel_button");
    btnCancel.addEventListener("click", () => {
        overlay.style.display = "none";

    })
}

async function setTeacherInformation(id) {
    try {
        const res = await fetch(`http://localhost:4000/api/teacher/${id}`, {
            method: "GET"
        });
        const data = await res.json();

        const { numeroEmpleado, nombre, apellidoPaterno, apellidoMaterno, username, password } = data.teacherInformation;

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

        const newTeacherInformation = {
            numeroEmpleado: document.querySelector("#edit_input_numeroEmpleado").value,
            nombre: document.querySelector("#edit_input_nombre").value,
            apellidoPaterno: document.querySelector("#edit_input_apellidoPaterno").value,
            apellidoMaterno: document.querySelector("#edit_input_apellidoMaterno").value,
            username: document.querySelector("#edit_input_username").value,
            password: document.querySelector("#edit_input_password").value,
        }
        sendUpdateInformation(newTeacherInformation, id);
    })
}

async function sendUpdateInformation(newInfo, id) {
    try {
        const res = await fetch(`http://localhost:4000/api/update-teacher/${id}`, {
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

