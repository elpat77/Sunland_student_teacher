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
                $('#student').text(`Viewing Grades for ${student.name}`);
                getGrades(classId, studentId, grades => {
                    console.log(grades);
                    let assignments = grades.Assignments;
                    let tests = grades.Tests;
                    let quiz = grades.Quizzes;

                    for (let i = 0; i < assignments.length; i++) {
                        $('#selectedAssignmentVal').append(`
                            <option>${assignments[i].title}</option>
                            `);
                        $('#assignmentGrades').append(`                                
                        <div class="card-header">${assignments[i].title}</div>
                        <div class="card-body">
                            <p class="card-text text-dark overviewAssignPoints">Points: ${assignments[i].scored}/${assignments[i].totalPoints}
                            </p>
                            <p class="card-text text-dark overviewAssignGrades">Grade: ${assignments[i].grade}
                            </p>
                            <p class="card-text text-dark overviewAssignGrades">Due Date: ${assignments[i].dueDate}
                            </p>
                            <div class="mt-3">
                                <button type="submit" class="btn" id="changeOverviewAssignment">Change</button>
                            </div>
                        </div>`);
                    }
                    for (let i = 0; i < tests.length; i++) {
                        $('#selectedTestVal').append(`
                        <option>${tests[i].name}</option>
                        `);
                        $('#testGrades').append(`                                
                        <div class="card-header">${tests[i].name}</div>
                        <div class="card-body">
                            <p class="card-text text-dark overviewTestsPoints">Points: ${tests[i].scored}/${tests[i].totalPoints}
                            </p>
                            <p class="card-text text-dark overviewTestsGrades">Grade: ${tests[i].grade}
                            </p>
                            <div class="mt-3">
                                <button type="submit" class="btn" id="changeOverviewTests">Change</button>
                            </div>
                        </div>`);
                    }
                    for (let i = 0; i < quiz.length; i++) {
                        $('#selectedQuizzVal').append(`
                        <option>${quiz[i].name}</option>
                        `);
                        $('#quizzesGrades').append(`                                
                        <div class="card-header"><${quiz[i].name}/div>
                        <div class="card-body">
                            <p class="card-text text-dark overviewQuizzesPoints">Points: ${quiz[i].scored}/${quiz[i].totalPoints}
                            </p>
                            <p class="card-text text-dark overviewQuizzesGrades">Grade: ${quiz[i].grade}
                            </p>
                            <p class="card-text text-dark overviewQuizzesGrades">Date Assigned:
                            </p>
                            <div class="mt-3">
                                <button type="submit" class="btn" id="changeOverviewQuizzes">Change</button>
                            </div>

                        </div>`);
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