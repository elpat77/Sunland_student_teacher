$(document).ready(function () {
    $('#signIn').on('click', function (e) {
        e.preventDefault();
        let em = $('#logInEmail').val();
        let pw = $('#logInPassword').val();

        login(em, result => {
            console.log(result);

        });
    });

    function login(em, cb) {
        $.ajax({
            method: 'GET',
            url: `/studentsRoutes/searchEmail/${em}`
        }).then(result => {
            cb(result)
        });
    }
});