$(document).ready(function () {
    //login----------------------------------------------------------------------
    $('#signIn').on('click', function (e) {
        e.preventDefault();
        let email = $('#logInEmail').val();
        let password = $('#logInPassword').val();
        if (email.toLowerCase() != 'jennifer_ngo70@yahoo.com') {
            alert('Sorry, you do not have authorization');
        } else {
            getTeachersEmails(result => {
                searchTeacherByEmail(email, resultEmail => {
                    if (password === resultEmail.password) {
                        window.location.href = `/adminDashboard?location=dashboard&AdminId=${resultEmail.id}`;
                    } else {
                        alert('Incorrect Password');
                    }
                });
            });
        }
    });
    //---------------------------------------------------------------------------

    window.onload = function () {
        const urlQuerries = new URLSearchParams(window.location.search);
        const location = urlQuerries.get('location');
        if (location === 'dashboard') {
            let teacherId = urlQuerries.get('AdminId');
            getTeacherById(teacherId, result => {
                $('#name').text(result[0].name);
            });
        }

        getTeachersEmails(teacherEmailResult => {
            for (i = 0; i < teacherEmailResult.length; i++) {
                $('#changeTeacher').append(`<div class="card mt-2">
                <h5 class="card-header">Teacher</h5>
                <div class="card-body">
                <h5 class="card-title">${teacherEmailResult[i].email}</h5>
                <a href="#" class="btn btn-primary" value= "${teacherEmailResult[i].email}">modify</a>
                </div>
            </div>`);
            }
        });

        getStudentEmails(studentEmailResult => {
            for (i = 0; i < studentEmailResult.length; i++) {
                $('#changeStudent').append(`<div class="card mt-2">
                <h5 class="card-header">Student</h5>
                <div class="card-body">
                <h5 class="card-title">${studentEmailResult[i].email}</h5>
                <a href="#" class="btn btn-primary" value= "${studentEmailResult[i].email}">modify</a>
                </div>
            </div>`);
            }
        });
    };

    $('#newTeacherEmail').on('click', function () {
        $('#message').hide();
        $('#emailVal').hide();
    });

    //adding teacher email ----------------------------------------------------
    $('#submitNewTeacher').on('click', function (e) {
        e.preventDefault();
        let email = $('#newTeacherEmail').val();
        if (email != '' && email.includes('@')) {
            getTeachersEmails(resultEmails => {
                let teacherEmails = new Set();
                for (let i = 0; i < resultEmails.length; i++) {
                    teacherEmails.add(resultEmails[i].email);
                }
                if (teacherEmails.has(email)) {
                    $('#newTeacherEmail').val('');
                    $('#message').show().text('Sorry, email is already in the system');
                } else {
                    addTeacherEmail(email, result => {
                        $('#newTeacherEmail').val('');
                        $('#message').show().text('Email added!');
                        console.log(result);
                    });
                }
            });
        } else {
            $('#emailVal').show();
        }
    });
    //-------------------------------------------------------------------------

    //adding student email ----------------------------------------------------
    $('#submitNewStudent').on('click', function (e) {
        e.preventDefault();
        let email = $('#newStudentEmail').val();
        console.log(email);
        if (email != '' && email.includes('@')) {
            getStudentEmails(resultEmails => {
                console.log(resultEmails);
                let studentEmails = new Set();
                for (let i = 0; i < resultEmails.length; i++) {
                    studentEmails.add(resultEmails[i].email);
                }
                if (studentEmails.has(email)) {
                    $('#newStudentEmail').val('');
                    $('#studentMessage').show().text('Sorry, email is already in the system');
                } else {
                    addStudentEmail(email, result => {
                        $('#newStudentEmail').val('');
                        $('#studentMessage').show().text('Email added!');
                        console.log(result);
                    });
                }
            });
        } else {
            console.log('this was hit');
            $('#studentMessage').show().text('invalid email');
        }
    });
    //-------------------------------------------------------------------------

    function addStudentEmail(em, cb) {
        $.ajax({
            method: 'POST',
            url: '/emails/student',
            data: { email: em }
        }).then(result => {
            cb(result);
        });
    }

    function getStudentEmails(cb) {
        $.ajax({
            method: 'GET',
            url: '/emails/student'
        }).then(result => {
            cb(result);
        });
    }

    function addTeacherEmail(email, cb) {
        $.ajax({
            method: 'POST',
            url: '/emails/teacher',
            data: { email: email }
        }).then(result => {
            cb(result);
        });
    }

    function getTeacherById(id, cb) {
        $.ajax({
            method: 'GET',
            url: `/teacherRoutes/dashboard-teacher/${id}`
        }).then(result => {
            cb(result);
        });
    }

    function getTeachersEmails(cb) {
        $.ajax({
            method: 'GET',
            url: '/emails/teacher'
        }).then(result => {
            cb(result);
        });
    }

    function searchTeacherByEmail(em, cb) {
        $.ajax({
            method: 'GET',
            url: `/teacherRoutes/searchEmail/${em}`
        }).then(result => {
            cb(result);
        });
    };
});