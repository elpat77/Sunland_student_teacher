$(document).ready(function () {
    //firebase, auth key will be hiden in heroku later
    var firebaseConfig = {
        apiKey: "AIzaSyBqtfQOYZ0LdNr3eapaUN7S0Fj5zfOjN0g",
        authDomain: "sunland-e54f0.firebaseapp.com",
        databaseURL: "https://sunland-e54f0.firebaseio.com",
        projectId: "sunland-e54f0",
        storageBucket: "sunland-e54f0.appspot.com",
        messagingSenderId: "925381223070",
        appId: "1:925381223070:web:58169103c20e0917c4518f"
    };

    //initialize firebase app for teacher
    firebase.initializeApp(firebaseConfig);

    const auth = firebase.auth();
    const db = firebase.database();

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
            auth.createUserWithEmailAndPassword(email, password).then(cred => {
                let uid = auth.currentUser.uid;
                db.ref(uid).set({
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    status: 'Teacher'
                });
                window.location.href = '/login-teacher';
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
                $('#name').text(name);
            });
        }
    });


});