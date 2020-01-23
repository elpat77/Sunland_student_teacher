$(document).ready(function () {
    start();

    //initial setup ------------------------------------------------------------------
    function start() {
        let urlQuerries = new URLSearchParams(window.location.search);
        let teacherId = urlQuerries.get('TeacherId');
        let classId = urlQuerries.get('ClassId');
        $.ajax({
            method: 'GET',
            url: `/teacherRoutes/searchById/${teacherId}`
        }).then(result => {
            $('#name').text(result.name);
            getStudentsInClass(classId, resultStudents => {

            });
        });
    }
    //--------------------------------------------------------------------------------

    function getStudentsInClass(classId, cb) {
        $.ajax({
            method: 'GET',
            url: `classesRoutes/searchClassById/${classId}`
        }).then(result => {
            let students = result.StudentClasses;
            for (let i = 0; i < students.length; i++) {
                $('.studentsEnrolled').append(`
                <li class="list-group-item">
                    <a href="#" class="card-link" id="student1">${students[i].studentName}</a>
                </li>
                `);
            }
        });
    }
});