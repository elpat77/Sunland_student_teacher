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
    //login----------------------------------------------------------------------

    window.onload = function () {
        const urlQuerries = new URLSearchParams(window.location.search);
        const location = urlQuerries.get('location');
        if (location === 'dashboard') {
            let teacherId = urlQuerries.get('AdminId');
            getTeacherById(teacherId, result => {
                $('#name').text(result[0].name);
            });
        }
    };

    $('#newTeacherEmail').on('click', function () {
        $('#message').hide();
    });

    $('#submitNewTeacher').on('click', function (e) {
        e.preventDefault();
        let email = $('#newTeacherEmail').val();
        console.log(email);
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
            $('#message').show().text('that email is invalid');
        }
    });

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