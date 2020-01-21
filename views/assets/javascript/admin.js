$(document).ready(function () {
    $('#signIn').on('click', function (e) {
        e.preventDefault();
        let email = $('#logInEmail').val();
        let password = $('#logInPassword').val();
        if (email.toLowerCase() != 'jennifer_ngo70@yahoo.com') {
            alert('Sorry, you do not have authorization');
        } else {
            getTeachersEmails(result => {
                console.log(result);
                searchTeacherByEmail(email, resultEmail => {
                    if (password === resultEmail.password) {
                        window.location.href = `/adminDashboard?AdminId=${resultEmail.id}`;
                    } else {
                        alert('Incorrect Password');
                    }
                });
            });

        }
    });

    window.onload = function () {
        console.log('Hello');

    };

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