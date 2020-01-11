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

    //initialize firebase app
    firebase.initializeApp(firebaseConfig);

    const auth = firebase.auth();
    const db = firebase.database();

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