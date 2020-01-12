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

    //initialize firebase app for student
    firebase.initializeApp(firebaseConfig);

    const auth = firebase.auth();
    const db = firebase.database();

    //Creating Account -------------------------------------------------------------
    $('#signUpbtn').on('click', function (e) {
        e.preventDefault();

        let email = $('#studentEmail').val();
        let password = $('#studentPassword').val();
        let firstName = $('#studentFirstName').val();
        let lastName = $('#studentLastName').val();
        let classTopic = $('#studentDiscipline').val();
        let group = $('#studentGroup').val() + $('#studentSection').val();
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
        if (classTopic === null) {
            $('#classTopicVal').show();
        }
        if ($('#studentGroup').val() === null) {
            $('#groupVal').show();
        }
        if ($('#studentSection').val() === null) {
            $('#gradeVal').show();
        }
        if (email != '' && password != '' && firstName != '' && lastName != '' && classTopic != null & group != 0) {
            auth.createUserWithEmailAndPassword(email, password).then(cred => {
                let uid = auth.currentUser.uid;
                db.ref(uid).set({
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    classTopic: classTopic,
                    group: group
                });
            });
        }
    });
    //--------------------------------------------------------------------------------


    $('#studentEmail').on('click', function () {
        $('#emailVal').hide();
    });
    $('#studentPassword').on('click', function () {
        $('#passwordVal').hide();
    });
    $('#studentFirstName').on('click', function () {
        $('#firstNameVal').hide();
    });
    $('#studentLastName').on('click', function () {
        $('#lastNameVal').hide();
    });
    $('#studentDiscipline, #studentGroup, #studentSection').on('click', function () {
        $('#classTopicVal').hide();
        $('#groupVal').hide();
        $('#gradeVal').hide();
    });

    $('#logInbtn').on('click', function (e) {
        e.preventDefault();
        let em = $('#logInEmail').val();
        let pw = $('#logInPassword').val();

        auth.signInWithEmailAndPassword(em, pw).catch(err => {
            console.log(err.message);
            alert('Password or email is incorrect');
        });
    });

});