$(document).ready(function () {
    $('#signIn').on('click', function (e) {
        e.preventDefault();
        let em = $('#logInEmail').val();
        let pw = $('#logInPassword').val();

        login(em, result => {
            console.log(result);
            if (result === null) {
                alert('No Email found');
            }
            if (em === result.email && pw === result.password) {
                window.location.href = `/dashboardStudent?Location="dashboard&StudentId="${result.id}"`
            }
        });
    });

    window.onload = function () {
        const urlQuerries = new URLSearchParams(window.location.search);
        // GETTING BASIC STUDENT INFO   --------------------------------------------------
        if (urlQuerries.get('location') == 'dashboard') {
            //getStudentsById();
        }
    }


    function login(em, cb) {
        $.ajax({
            method: 'GET',
            url: `/studentsRoutes/searchEmail/${em}`
        }).then(result => {
            cb(result)
        });
    }
});