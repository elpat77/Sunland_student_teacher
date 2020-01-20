$(document).ready(function () {
    //Creating Account -------------------------------------------------------------
    $('#signUpbtn').on('click', function (e) {
        e.preventDefault();

        let email = $('#teacherEmail').val();
        let password = $('#teacherPassword').val();
        let firstName = $('#teacherFirstName').val();
        let lastName = $('#teacherLastName').val();

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

        auth.signInWithEmailAndPassword(em, pw).catch(err => {
            console.log(err.message);
        }).then(res => {
            window.location.href = '/dashboard-teacher';
        });
    });
    //--------------------------------------------------------------------------------

    auth.onAuthStateChanged(user => {
        if (user) {
            let uid = auth.currentUser.uid;
            console.log(uid);
            db.ref(uid).on('value', snap => {
                let name = snap.val().firstName;
                console.log(name);
                $('#name').text(name);
            });
        }
    });


});