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
                $('#invalidFormSubmission').fadeIn(1000);
                setTimeout(function () {
                    $('#invalidFormSubmission').fadeOut(1000);
                }, 5000);
            }
        });
    });
    //--------------------------------------------------------------------------------

    window.onload = function () {
        const urlQuerries = new URLSearchParams(window.location.search);
        // GETTING BASIC TEACHER INFO   --------------------------------------------------
        if (urlQuerries.get('location') == 'dashboard') {
            //annoucenemt section
            $.ajax({
                method: 'GET',
                url: '/adminAnnouncements',
            }).then(result => {
                for (let i = 0; i < result.length; i++) {
                    let timeAndDate = result[i].createdAt.split('T');
                    let date = new Date(timeAndDate[0]).toString();
                    let day = date.substring(0, 15);
                    $('#adminAnnouncements').prepend(`
                <div class="card text-white mb-3 text-center">
                    <div class="card-header">${result[i].title}</div>
                        <div class="card-body">
                            <h5 class="card-title"></h5>
                            <p class="card-text text-dark schoolAnnouncements">${result[i].body}
                            </p>
                            <h6>Posted: ${day}</h6>
                        </div>
                </div>
                `);
                }
                getCourses();
            });
            //-----------------------------------------------------------------------
        }
    }

    //View Courses ------------------------------------------------------------------
    $(document).on('click', '#btnCourses', function (e) {
        e.preventDefault();
        let classId = $(this).attr('value');
        const urlQuerries = new URLSearchParams(window.location.search);
        let teacherId = urlQuerries.get('TeacherId');
        window.location.href = `/classInfoTeacher?TeacherId=${teacherId}&ClassId=${classId}`;
    });
    //-------------------------------------------------------------------------------

    //Change Password ---------------------------------------------------------------
    $('#changeTeacherPwdBtn').on('click', function (e) {
        const urlQuerries = new URLSearchParams(window.location.search);
        let teacherId = urlQuerries.get('TeacherId');
        console.log(teacherId);

        e.preventDefault();
        let newPassword = $('#newPassword').val();
        let againPassword = $('#newPasswordRetype').val();
        if (newPassword != againPassword) {
            alert('Passwords must match');
        } else {
            $.ajax({
                method: 'PUT',
                url: `/teacherRoutes/changePassword/${teacherId}`,
                data: { password: newPassword }
            }).then(result => {
                console.log(result);
            });
        }
    });
    //-------------------------------------------------------------------------------

    //logout ------------------------------------------------------------------------
    $('#logOut').on('click', function (e) {
        e.preventDefault();
        window.location.href = '/';
    });
    //-------------------------------------------------------------------------------

    function login(cb) {
        $.ajax({
            method: 'GET',
            url: '/teacherRoutes',
        }).then(result => {
            cb(result);
        });
    }

    function getCourses() {
        const urlQuerries = new URLSearchParams(window.location.search);
        const teacherId = urlQuerries.get('TeacherId');
        //teacher classes
        $.ajax({
            method: 'GET',
            url: `/teacherRoutes/dashboard-teacher/${teacherId}`
        }).then(res => {
            console.log(res);
            $('#name').text(res[0].name);


            if (res[0].Classes.length != 0) {
                console.log('passed conditional');

                for (let i = 0; i < res[0].Classes.length; i++) {

                    let classes = res[0].Classes;
                    console.log(classes[i])
                    $('.classCard').append(`                            
                        <div class="card text-white bg-primary mb-3 text-center">
                            <div class="card-header">${classes[i].subject} ${classes[i].section}</div>
                            <div class="card-body">
                              <h5 class="card-title">Meet Time: ${classes[i].meetTime}</h5>
                              <p class="card-text text-dark">Location: ${classes[i].location}</p>
                              <a class="btn" value="${classes[i].id}" id="btnCourses" href="">Class Info</a>
                            </div>
                        </div>`);
                }
            }
        });
    }

});