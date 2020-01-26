$(document).ready(function () {
    let urlQuerries = new URLSearchParams(window.location.search);
    let teacherId = urlQuerries.get('TeacherId');

    start();
    function start() {
        let studentId = urlQuerries.get('StudentId');
        let classId = urlQuerries.get('ClassId');
        getTeacherById(teacherId, teacher => {
            $('#name').text(teacher.name);
            getStudentById(studentId, student => {
                $('.studentNameHeader').text(student.name);
                getGrades(classId, studentId, grades => {
                    console.log(grades);
                    let assignments = grades.Assignments;
                    let tests = grades.Tests;
                    let quiz = grades.Quizzes;

                    for (let i = 0; i < assignments.length; i++) {
                        $('#selectedAssignmentVal').append(`
                            <option>${assignments[i].title}</option>
                            `);
                    }
                    for (let i = 0; i < tests.length; i++) {
                        $('#selectedTestVal').append(`
                        <option>${tests[i].name}</option>
                        `);
                    }
                    for (let i = 0; i < quiz.length; i++) {
                        $('#selectedQuizzVal').append(`
                        <option>${quiz[i].name}</option>
                        `);
                    }

                });

            });
        });
    }

    function getGrades(classId, studentId, cb) {
        $.ajax({
            method: 'GET',
            url: `/gradesRoutes/${classId}/${studentId}`
        }).then(result => {
            cb(result);
        });
    }

    function getAssignments() {

    }

    function getTeacherById(id, cb) {
        $.ajax({
            method: 'GET',
            url: `/teacherRoutes/searchById/${id}`
        }).then(result => {
            cb(result);
        });
    }

    function getStudentById(id, cb) {
        $.ajax({
            method: 'GET',
            url: `/studentsRoutes/${id}`
        }).then(result => {
            cb(result);
        });
    }
});