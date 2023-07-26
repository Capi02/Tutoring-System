
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
        // { data: 'matricula' },
        { data: 'username' },
        { data: 'password'},
        { data: 'role'}
    ],
});
}
