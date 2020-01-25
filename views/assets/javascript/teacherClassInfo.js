$(document).ready(function () {
    var urlQuerries = new URLSearchParams(window.location.search);
    start();

    //initial setup ------------------------------------------------------------------
    function start() {
        let teacherId = urlQuerries.get('TeacherId');
        let classId = urlQuerries.get('ClassId');
        $.ajax({
            method: 'GET',
            url: `/teacherRoutes/searchById/${teacherId}`
        }).then(result => {
            $('#name').text(result.name);
            getStudentsInClass(classId, resultStudents => {
            });
        });
    }
    //--------------------------------------------------------------------------------

    //Back to dashboard button -------------------------------------------------------
    $('.btnBackTeacherDash').on('click', function (e) {
        e.preventDefault();
        let teacherId = urlQuerries.get('TeacherId');
        window.location.href = `/dashboard-teacher?location=dashboard&TeacherId=${teacherId}`
    });
    //--------------------------------------------------------------------------------

    //create new announcements--------------------------------------------------------
    $('#announcementSubmit').on('click', function () {
        let title = $('#newAnnouncemetTitle').val();
        let text = $('#newAnnouncementContent').val();
        let classId = urlQuerries.get('ClassId');
        $.ajax({
            method: 'POST',
            url: `/announcementRoutes/${classId}`,
            data: {
                title: title,
                body: text
            }
        }).then(result => {
            console.log(result);
            alert('Announcement created');
            $('#newAnnouncemetTitle').val('');
            $('#newAnnouncementContent').val('');
        });
    });
    //--------------------------------------------------------------------------------

    //Create new class assignment ----------------------------------------------------

    //--------------------------------------------------------------------------------

    //logout--------------------------------------------------------------------------
    $('#logOut').on('click', function (e) {
        e.preventDefault();
        window.location.href = '/';

    });
    //--------------------------------------------------------------------------------

    function getStudentsInClass(classId, cb) {
        $.ajax({
            method: 'GET',
            url: `classesRoutes/searchClassById/${classId}`
        }).then(result => {
            let students = result.StudentClasses;
            for (let i = 0; i < students.length; i++) {
                $('.studentsEnrolled').append(`
                <li class="list-group-item">
                    <a href="#" class="card-link" id="student1">${students[i].studentName}</a>
                </li>
                `);
            }
        });
    }
});