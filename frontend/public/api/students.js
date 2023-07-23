
document.addEventListener('DOMContentLoaded', function () {
    getStudents()
});


async function getStudents(){
    const res = await fetch("http://localhost:4000/api/students");
    const data = await res.json();
    studentsTable(data)
}

function studentsTable(students){
    let table = new DataTable("#students_table", {
    responsive: true,
    buttons: [
        'copy', 'excel', 'pdf'
    ],
    data: students,
    columns: [
        { data: 'matricula' },
        { data: 'username' },
        { data: 'password'},
        { data: 'role'}
    ],
});
}



// const students_table = document.querySelector(".students_table");


// const getStudents = async () => {
//     const res = await fetch("/api/admin/students");
//     const data = await res.json()
//     let tr = document.createElement("TR");
//     data.map(user => {
//         if (user.username !== "admin") {
//             const { matricula, username, password, role } = user
//             tr = `<td>${matricula}</td>
//                   <td>${username}</td>
//                   <td>${password}</td>
//                   <td>${role}</td>
//                   <td>
//                     <button class="btn_edit" onclick="btnEdit()">Edit</button>
//                     <button class="btn_delete" onclick="btnDelete()">Delete</button>
//                   </td>
//             `
//             students_table.innerHTML += tr
//         } else {
//             return null
//         }
//     })
// }

// function btnEdit() {
//     console.log("Editing...")
// }

// function btnDelete(){
//     console.log("Deleting...")
// }



