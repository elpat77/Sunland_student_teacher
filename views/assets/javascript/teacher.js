$(document).ready(function () {

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
                        <a class="btn" value="${classes[i].id}" id="btnCourses" href="">Class
                            Info</a>
                    </div>
                </div>`);
                    }
                }
            });
            // ----------------------------------------------------------------------
        }
    }

    //View Courses ------------------------------------------------------------------
    $(document).on('click', '#btnCourses', function (e) {
        e.preventDefault();
        let classId = $(this).attr('value');
        window.location.href = `/classInfoTeacher?ClassId=${classId}`;
    });
    //-------------------------------------------------------------------------------

    //logout ------------------------------------------------------------------------
    $('#logOut').on('click', function (e) {
        e.preventDefault();
        console.log('clicked');
    });
    //-------------------------------------------------------------------------------

});