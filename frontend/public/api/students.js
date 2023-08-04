
document.addEventListener('DOMContentLoaded', function () {
    getStudents()
    btnDelete();
    btnEdit();

});

async function getStudents() {
    try {
        const res = await fetch("http://localhost:4000/api/students");
        const data = await res.json();
        studentsTable(data);
    } catch (error) {
        console.log(error);
    }

}

function studentsTable(students) {
    console.log(students)
    let table = new DataTable("#students_table", {
        responsive: true,
        data: students,
        columns: [
            { data: 'matricula' },
            { data: "apellidoPaterno" },
            { data: "apellidoMaterno" },
            { data: 'nombre' },
            { data: 'username' },
            { data: 'role' },
            { // Agregamos una columna para las acciones
                data: null,
                render: function (data, type, row) {
                    return `
                <button class="student_edit_button btn_edit" data-id="${data.id}">Editar</button>
                <button class="student_delete_button btn_delete" data-id="${data.id}">Eliminar</button>
              `;
                }
            }
        ],
    });
}

function btnDelete() {
    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('student_delete_button')) {
            const studentId = event.target.dataset.id;
            deleteStudent(studentId);
        }
    });
}
async function deleteStudent(id) {
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
        if (e.target.classList.contains("student_edit_button")) {
            const overlay = document.querySelector("#overlay");
            overlay.style.display = "block"
            const studentId = e.target.dataset.id;
            setStudentInformation(studentId)
            closeOverlay()
        }
    })
}
function closeOverlay() {
    const btnCancel = document.querySelector(".student_cancel_button");
    btnCancel.addEventListener("click", () => {
        overlay.style.display = "none";

    })
}


async function setStudentInformation(id) {
    try {
        const res = await fetch(`http://localhost:4000/api/student/${id}`, {
            method: "GET"
        });
        const data = await res.json();

        const { matricula, nombre, apellidoPaterno, apellidoMaterno, username, password } = data.studentInformation;

        document.querySelector("#edit_input_matricula").value = matricula;
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

        const newStudentInformation = {
            matricula: document.querySelector("#edit_input_matricula").value,
            nombre: document.querySelector("#edit_input_nombre").value,
            apellidoPaterno: document.querySelector("#edit_input_apellidoPaterno").value,
            apellidoMaterno: document.querySelector("#edit_input_apellidoMaterno").value,
            username: document.querySelector("#edit_input_username").value,
            password: document.querySelector("#edit_input_password").value,
        }
        sendUpdateInformation(newStudentInformation, id);
    })
}

async function sendUpdateInformation(newInfo, id) {
    try {
        const res = await fetch(`http://localhost:4000/api/update-student/${id}`, {
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

