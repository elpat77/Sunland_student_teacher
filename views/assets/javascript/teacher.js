$(document).ready(function () {

    //Creating Account -------------------------------------------------------------
    $('#signUpbtn').on('click', function (e) {
        e.preventDefault();

        let email = $('#teacherEmail').val();
        let password = $('#teacherPassword').val();
        let firstName = $('#teacherFirstName').val();
        let lastName = $('#teacherLastName').val();
        let fullName = firstName + ' ' + lastName;

        if (email === '') {
            $('#emailVal').show();
        }
        if (password === '') {
            $('#passwordVal').show();
        }
        if (firstName === '') {
            $('#firstNameVal').show();
        }
        if (lastName === '') {
            $('#lastNameVal').show();
        }
        if (email != '' && password != '' && firstName != '' && lastName != '') {
            $.ajax({
                method: 'GET',
                url: '/emails/teacherEmails'
            }).then(res => {
                let teachers = new Set();
                for (let i = 0; i < res.length; i++) {
                    teachers.add(res[i].email);
                }
                if (teachers.has(email)) {
                    login(result => {
                        console.log(result);
                        let teachersSet = new Set();
                        for (let j = 0; j < result.length; j++) {
                            teachersSet.add(result[j].email);
                        }
                        if (!teachersSet.has(email)) {
                            createAccount(fullName, email, password, resultAccount => {
                                console.log(resultAccount);
                            });
                            window.location.href = '/teacherlogin';
                        } else {
                            alert('This email has an account already');
                        }

                    });
                } else {
                    alert('sorry, you must be registered by the school');
                }

            });
        }
    });
    //--------------------------------------------------------------------------------

    //Validation ---------------------------------------------------------------------
    $('#teacherEmail').on('click', function () {
        $('#emailVal').hide();
    });
    $('#teacherPassword').on('click', function () {
        $('#passwordVal').hide();
    });
    $('#teacherFirstName').on('click', function () {
        $('#firstNameVal').hide();
    });
    $('#teacherLastName').on('click', function () {
        $('#lastNameVal').hide();
    });

    //--------------------------------------------------------------------------------

    //Log in -------------------------------------------------------------------------
    $('#signIn').on('click', function (e) {
        e.preventDefault();
        let em = $('#logInEmail').val();
        let pw = $('#logInPassword').val();
        login(result => {
            console.log(result);
            let success = false;
            let id = 0;

            for (let i = 0; i < result.length; i++) {
                if (result[i].email === em && result[i].password === pw) {
                    success = true;
                    id = i;
                    i = result.length;
                } else {
                    console.log('not it');
                }
            }
            console.log(result[id].id);
            if (success === true) {
                window.location.assign(`/dashboard-teacher?location=dashboard&TeacherId=${result[id].id}`);
            } else {
                alert('sorry, wrong password or email');
            }
        });

    });
    //--------------------------------------------------------------------------------

    window.onload = function () {
        const urlQuerries = new URLSearchParams(window.location.search);
        const teacherId = urlQuerries.get('TeacherId');
        // GETTING BASIC TEACHER INFO   --------------------------------------------------
        if (urlQuerries.get('location') == 'dashboard') {
            $.ajax({
                method: 'GET',
                url: `/teacherRoutes/dashboard-teacher/${teacherId}`
            }).then(res => {
                console.log(res);
                $('#name').text(res[0].name);
                if (res[0].Classes.length != 0) {
                    for (let i = 0; i < res[0].Classes.length; i++) {
                        let classes = res[0].Classes;
                        $('.classCard').append(`                            
                    <div class="card text-white bg-primary mb-3 text-center">
                    <div class="card-header">${classes[i].subject + classes[i].section}</div>
                    <div class="card-body">
                        <h5 class="card-title">Basic Details regarding this course</h5>
                        <p class="card-text text-dark">Lorem ipsum dolor sit amet consectetur
                            adipisicing
                            elit.
                            Incidunt, dignissimos!</p>
                        <a class="btn" id="btnCourses" href="../views/classInfoTeacher.html">Class
                            Info</a>
                    </div>
                </div>`);
                    }
                }
            });
            // ----------------------------------------------------------------------

        }
    }

    $('#logOut').on('click', function (e) {
        e.preventDefault();
        console.log('clicked');
    });

    function login(cb) {
        $.ajax({
            method: 'GET',
            url: '/teacherRoutes',
        }).then(result => {
            cb(result);
        });
    }

    function createAccount(fullName, email, password, cb) {
        $.ajax({
            method: 'POST',
            url: '/teacherRoutes',
            data: {
                name: fullName,
                email: email,
                password: password,
                picture: null
            }
        }).then(res => {
            cb(res);
        });
    };


});