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
                    overViewOfGrades(grades)
                });
            });
        });
    }

    //back to class button ---------------------------------------------------------------------
    $('#backCI').on('click', function (e) {
        e.preventDefault();
        let classId = urlQuerries.get('ClassId');
        window.location.href = `/classInfoTeacher?TeacherId=${teacherId}&ClassId=${classId}`;
    });
    //------------------------------------------------------------------------------------------

    //Grade assignment -------------------------------------------------------------------------
    $('#gradedAssignmentSubmit').on('click', function (e) {
        e.preventDefault();
        let classId = urlQuerries.get('ClassId');
        let studentId = urlQuerries.get('StudentId');
        let assignment = $('#selectedAssignmentVal').val();
        let turnedIn = $('#turnedInVal').val();
        let score = $('#gradedAssignmentScore').val();
        console.log(turnedIn);

        if (assignment === null) {
            $('#selectedAssignmentValVal').show();
        }
        if (turnedIn === null) {
            $('#turnedInValVal').show()
        }
        if (score === '') {
            $('#gradedAssignmentScoreVal').show();
        }

        if (assignment != null && turnedIn != null && score != '') {
            getAssignment(assignment, result => {
                let points = (score / result.totalPoints) * 100;
                let grade = setGrade(points);
                let yesNo;
                if (turnedIn === 'Yes') {
                    yesNo = true;
                } else {
                    yesNo = false;
                }
                console.log(points);

                updateGrades(assignment, yesNo, score, grade, result => {
                    console.log(result);

                    getGrades(classId, studentId, allResults => {
                        overViewOfGrades(allResults);
                    });
                });
            });
        }
    });
    //------------------------------------------------------------------------------------------

    //Validation -------------------------------------------------------------------------------
    $('#selectedAssignmentVal').on('click', function () {
        $('#selectedAssignmentValVal').hide();
    });
    $('#turnedInVal').on('click', function () {
        $('#turnedInValVal').hide();
    });
    $('#gradedAssignmentScore').on('click', function () {
        $('#gradedAssignmentScoreVal').hide();
    });
    //------------------------------------------------------------------------------------------

    function setGrade(points) {
        let grade;
        if (points >= 90) {
            grade = 'A';
        } else if (points < 90 && points >= 80) {
            grade = 'B';
        } else if (points < 80 && points >= 70) {
            grade = 'C';
        } else if (points < 70 && points >= 60) {
            grade = 'D';
        } else {
            grade = 'F';
        }
        return grade;
    }

    function getGrades(classId, studentId, cb) {
        $.ajax({
            method: 'GET',
            url: `/gradesRoutes/${classId}/${studentId}`
        }).then(result => {
            cb(result);
        });
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

    function getAssignment(id, cb) {
        $.ajax({
            method: 'GET',
            url: `/assignmentsRoutes/${id}`
        }).then(result => {
            cb(result);
        });
    }

    function updateGrades(id, turnedIn, score, grade, cb) {
        $.ajax({
            method: 'PUT',
            url: `/assignmentsRoutes/updateGrades/${id}`,
            data: {
                turnedIn: turnedIn,
                score: score,
                grade: grade
            }
        }).then(result => {
            cb(result);
        });
    }

    function overViewOfGrades(grades) {
        let assignments = grades.Assignments;
        let tests = grades.Tests;
        let quiz = grades.Quizzes;
        $('#assignmentGrades').empty();
        $('#testGrades').empty();
        $('#quizzesGrades').empty();

        for (let i = 0; i < assignments.length; i++) {
            let date = new Date(assignments[i].dueDate).toString();
            let due = date.substring(0, 15);
            let turnedIn;
            $('#selectedAssignmentVal').append(`
                <option value="${assignments[i].id}">${assignments[i].title}</option>
                `);
            assignments[i].turnedIn ? turnedIn = 'Yes' : turnedIn = 'No';
            $('#assignmentGrades').prepend(`
            <div class="card mb-4 text-center" style="width: 50rem;">                                
                <div class="card-header">${assignments[i].title}</div>
                <div class="card-body">
                    <p class="card-text text-dark overviewAssignPoints">Points: ${assignments[i].scored}/${assignments[i].totalPoints} Grade: ${assignments[i].grade}
                    </p>
                    <p class="card-text text-dark overviewAssignGrades">Submitted: ${turnedIn}
                    </p>
                    <p class="card-text text-dark overviewAssignGrades">Due Date: ${due}
                    </p>
                    <div class="mt-3">
                        <button type="submit" class="btn" id="changeOverviewAssignment">Change</button>
                    </div>
                </div>
            </div>`);
        }
        for (let i = 0; i < tests.length; i++) {
            let date = new Date(tests[i].date).toString();
            let show = date.substring(0, 15);
            $('#selectedTestVal').append(`
            <option>${tests[i].name}</option>
            `);
            $('#testGrades').append(`
            <div class="card mb-4 text-center" style="width: 50rem;">
                <div class="card-header">${tests[i].name}</div>
                <div class="card-body">
                    <p class="card-text text-dark overviewTestsPoints">Points: ${tests[i].scored}/${tests[i].totalPoints}
                    </p>
                    <p class="card-text text-dark overviewTestsGrades">Grade: ${tests[i].grade}
                    </p>
                    <p class="card-text text-dark overviewTestsGrades">Date of Test: ${show}
                    </p>
                    <div class="mt-3">
                        <button type="submit" class="btn" id="changeOverviewTests">Change</button>
                    </div>
                </div>
            </div> `);
        }
        for (let i = 0; i < quiz.length; i++) {
            let date = new Date(tests[i].date).toString();
            let show = date.substring(0, 15);
            $('#selectedQuizzVal').append(`
            <option>${quiz[i].name}</option>
            `);
            $('#quizzesGrades').append(`     
            <div class="card mb-4 text-center" style="width: 50rem;">
                <div class="card-header">${quiz[i].name}</div>
                <div class="card-body">
                    <p class="card-text text-dark overviewTestsPoints">Points: ${quiz[i].scored}/${quiz[i].totalPoints}
                    </p>
                    <p class="card-text text-dark overviewTestsGrades">Grade: ${quiz[i].grade}
                    </p>
                    <p class="card-text text-dark overviewTestsGrades">Date of Quiz: ${show}
                    </p>
                    <div class="mt-3">
                        <button type="submit" class="btn" id="changeOverviewTests">Change</button>
                    </div>
                </div>
            </div> `);
        }
    }
});