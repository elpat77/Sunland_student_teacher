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
                method: 'POST',
                url: '/teacherRoutes',
                data: {
                    name: fullName,
                    email: email,
                    password: password,
                    picture: null
                }
            }).then(res => {
                console.log(res);
            });
            window.location.href = '/teacherlogin'
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
        login(res => {
            console.log(res);
        });

        function login(cb) {
            $.ajax({
                method: 'GET',
                url: '/teacherRoutes',
            }).then(result => {
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
                    cb(result);
                    window.location.assign(`/dashboard-teacher?${result[id].id}`);
                } else {
                    alert('sorry, wrong password or email');
                }
            });

        }

        $('#logOut').on('click', function (e) {
            e.preventDefault();
            console.log('clicked');
        });

    });

    //--------------------------------------------------------------------------------


});