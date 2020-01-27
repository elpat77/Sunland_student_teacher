$(document).ready(function () {
    var urlQuerries = new URLSearchParams(window.location.search);
    start();

    //initial setup ------------------------------------------------------------------
    function start() {
        let teacherId = urlQuerries.get('TeacherId');
        let classId = urlQuerries.get('ClassId');
        $.ajax({
            method: 'GET',
            url: `/teacherRoutes/searchById/${teacherId}`
        }).then(result => {
            $('#name').text(result.name);
            getStudentsInClass(classId, students => {
                for (let i = 0; i < students.length; i++) {
                    $('.studentsEnrolled').append(`
                    <li class="list-group-item">
                        <a href="/gradesTeacher?StudentId=${students[i].studentId}&ClassId=${classId}&TeacherId=${teacherId}" class="card-link studentNames" id="student1">${students[i].studentName}</a>
                    </li>
                    `);
                }
            });
        });
    }
    //--------------------------------------------------------------------------------

    //Back to dashboard button -------------------------------------------------------
    $('.btnBackTeacherDash').on('click', function (e) {
        e.preventDefault();
        let teacherId = urlQuerries.get('TeacherId');
        window.location.href = `/dashboard-teacher?location=dashboard&TeacherId=${teacherId}`
    });
    //--------------------------------------------------------------------------------

    //create new announcements--------------------------------------------------------
    $('#announcementSubmit').on('click', function () {
        let title = $('#newAnnouncemetTitle').val();
        let text = $('#newAnnouncementContent').val();
        let classId = urlQuerries.get('ClassId');
        $.ajax({
            method: 'POST',
            url: `/announcementRoutes/${classId}`,
            data: {
                title: title,
                body: text
            }
        }).then(result => {
            console.log(result);
            alert('Announcement created');
            $('#newAnnouncemetTitle').val('');
            $('#newAnnouncementContent').val('');
        });
    });
    //--------------------------------------------------------------------------------

    //Create new class assignment ----------------------------------------------------
    $('#assignmentSubmit').on('click', function () {
        let classId = urlQuerries.get('ClassId');
        let title = $('#assignmentTitle').val();
        let dueDate = $('#assignmentDate').val();
        let time = $('#assignmentTime').val();
        let value = $('#assignmentPoints').val();
        let dis = $('#assignmentContent').val();

        if (title === '') {
            $('#assignmentTitleVal').show();
        }
        if (dueDate === '') {
            $('#assignmentDateVal').show();
        }
        if (time === '') {
            $('#assignmentTimeVal').show();
        }
        if (value === '') {
            $('#assignmentPointsVal').show();
        }
        if (title != '' && dueDate != '' && time != '' && value != '') {
            getGrades(classId, studentGrades => {
                if (studentGrades.length === 0) {
                    alert('You must set up class grades first!');
                } else {
                    for (let i = 0; i < studentGrades.length; i++) {
                        $.ajax({
                            method: 'POST',
                            url: `/assignmentsRoutes/${studentGrades[i].id}`,
                            data: {
                                dueDate: dueDate,
                                title: title,
                                timeDue: time,
                                description: dis,
                                turnedIn: false,
                                grade: '-',
                                totalPoints: value,
                                scored: 0
                            }
                        }).then(result => {
                            $('#assignmentTitle').val('');
                            $('#assignmentDate').val('');
                            $('#assignmentTime').val('');
                            $('#assignmentPoints').val('');
                            $('#assignmentContent').val('');
                            alert('Assignment Created');
                        });
                    }
                }
            });
        }

    });
    //--------------------------------------------------------------------------------

    //Setup grades for each student in class -----------------------------------------
    $('#gradeSubmit').on('click', function () {
        let classId = urlQuerries.get('ClassId');
        let assignment = $('#assignmentPercent').val();
        let quiz = $('#quizzesPercent').val();
        let tests = $('#testPercent').val();

        getStudentsInClass(classId, students => {
            for (let i = 0; i < students.length; i++) {
                $.ajax({
                    method: 'POST',
                    url: `/gradesRoutes/${students[i].studentId}`,
                    data: {
                        idClass: classId,
                        finalGrade: '-',
                        qp: quiz,
                        ap: assignment,
                        testPercent: tests
                    }
                }).then(result => {
                    console.log(result);
                });
            }
            alert('grades setup completed');
        });
    });
    //--------------------------------------------------------------------------------

    //Validation ---------------------------------------------------------------------
    $('#assignmentTitle').on('click', function () {
        $('#assignmentTitleVal').hide();
    });
    $('#assignmentDate').on('click', function () {
        $('#assignmentDateVal').hide();
    });
    $('#assignmentTime').on('click', function () {
        $('#assignmentTimeVal').hide();
    });
    $('#assignmentPoints').on('click', function () {
        $('#assignmentPointsVal').hide();
    });
    $('#testTitle').on('click', function () {
        $('#testTitleVal').hide();
    });
    $('#testPoints').on('click', function () {
        $('#testpointsVal').hide();
    });
    $('#selectedTestTypeVal').on('click', function () {
        $('#selectedTestTypeValVal').hide();
    });
    //--------------------------------------------------------------------------------

    //Create new Test or Quiz --------------------------------------------------------
    $('#testSubmit').on('click', function () {
        let classId = urlQuerries.get('ClassId');
        let title = $('#testTitle').val();
        let type = $('#selectedTestTypeVal').val();
        let value = $('#testPoints').val();
        let des = $('#testContent').val();
        let typeUrl;

        if (title === '') {
            $('#testTitleVal').show();
        }
        if (type === null) {
            $('#selectedTestTypeValVal').show();
        }
        if (value === '') {
            $('#testpointsVal').show();
        }
        if (type === 'quiz') {
            typeUrl = 'quizzesRoutes';
        } else {
            typeUrl = 'testsRoutes';
        }
        getGrades(classId, resultGrades => {
            console.log(resultGrades);
            for (let i = 0; i < resultGrades.length; i++) {
                let gradeId = resultGrades[i].id;
                $.ajax({
                    method: 'POST',
                    url: `/${typeUrl}/${gradeId}`,
                    data: {
                        name: title,
                        totalPoints: value,
                        scored: 0,
                        grade: '-'
                    }
                }).then(result => {
                    console.log(result);
                    alert('Test Created!');
                });
            }
        });

    });
    //--------------------------------------------------------------------------------

    //logout--------------------------------------------------------------------------
    $('#logOut').on('click', function (e) {
        e.preventDefault();
        window.location.href = '/';
    });
    //--------------------------------------------------------------------------------

    function getStudentsInClass(classId, cb) {
        $.ajax({
            method: 'GET',
            url: `classesRoutes/searchClassById/${classId}`
        }).then(result => {
            let students = result.StudentClasses;
            cb(students)
        });
    }

    function getGrades(classId, cb) {
        $.ajax({
            method: 'GET',
            url: `/gradesRoutes/byClassId/${classId}`
        }).then(result => {
            cb(result);
        });
    }

});