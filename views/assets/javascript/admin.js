$(document).ready(function () {
    //login----------------------------------------------------------------------
    $('#signIn').on('click', function (e) {
        e.preventDefault();
        let email = $('#logInEmail').val();
        let password = $('#logInPassword').val();
        if (email.toLowerCase() != 'jennifer_ngo70@yahoo.com') {
            alert('Sorry, you do not have authorization');
        } else {
            getTeachersEmails(result => {
                searchTeacherByEmail(email, resultEmail => {
                    if (password === resultEmail.password) {
                        window.location.href = `/adminDashboard?location=dashboard&AdminId=${resultEmail.id}`;
                    } else {
                        alert('Incorrect Password');
                    }
                });
            });
        }
    });
    //---------------------------------------------------------------------------

    //Setting up information on load screan -------------------------------------
    window.onload = function () {
        const urlQuerries = new URLSearchParams(window.location.search);
        const location = urlQuerries.get('location');
        if (location === 'dashboard') {
            let teacherId = urlQuerries.get('AdminId');
            getTeacherById(teacherId, result => {
                $('#name').text(result[0].name);
            });
        }

        appendStudentEmails();
        appendTeacherEmails();
    };
    //---------------------------------------------------------------------------

    $('#newTeacherEmail').on('click', function () {
        $('#message').hide();
        $('#emailVal').hide();
    });

    //adding teacher email ----------------------------------------------------
    $('#submitNewTeacher').on('click', function (e) {
        e.preventDefault();
        let email = $('#newTeacherEmail').val();
        if (email != '' && email.includes('@')) {
            getTeachersEmails(resultEmails => {
                let teacherEmails = new Set();
                for (let i = 0; i < resultEmails.length; i++) {
                    teacherEmails.add(resultEmails[i].email);
                }
                if (teacherEmails.has(email)) {
                    $('#newTeacherEmail').val('');
                    $('#message').show().text('Sorry, email is already in the system');
                } else {
                    addTeacherEmail(email, result => {
                        $('#newTeacherEmail').val('');
                        $('#message').show().text('Email added!');
                        console.log(result);
                    });
                }
            });
        } else {
            $('#emailVal').show();
        }
    });
    //-------------------------------------------------------------------------

    //adding student email ----------------------------------------------------
    $('#submitNewStudent').on('click', function (e) {
        e.preventDefault();
        let email = $('#newStudentEmail').val();
        console.log(email);
        if (email != '' && email.includes('@')) {
            getStudentEmails(resultEmails => {
                console.log(resultEmails);
                let studentEmails = new Set();
                for (let i = 0; i < resultEmails.length; i++) {
                    studentEmails.add(resultEmails[i].email);
                }
                if (studentEmails.has(email)) {
                    $('#newStudentEmail').val('');
                    $('#studentMessage').show().text('Sorry, email is already in the system');
                } else {
                    addStudentEmail(email, result => {
                        $('#newStudentEmail').val('');
                        $('#studentMessage').show().text('Email added!');
                        console.log(result);
                    });
                }
            });
        } else {
            console.log('this was hit');
            $('#studentMessage').show().text('invalid email');
        }
    });
    //-------------------------------------------------------------------------

    //Changing Teacher Email Address ------------------------------------------    
    $(document).on('click', '.changeTeacherEmail', function (e) {
        e.preventDefault();
        let teacherEmailId = $(this).attr('value');
        let newEmail = $(`#newEmailTeacher${teacherEmailId}`).val();
        console.log(teacherEmailId);
        console.log(newEmail);

        updateTeacherEmail(teacherEmailId, newEmail, result => {
            console.log(result);
            appendStudentEmails();
            appendTeacherEmails();
        });

    });
    //-------------------------------------------------------------------------

    //appending emails
    //get teacher email information and modification
    function appendTeacherEmails() {
        $('#changeTeacher').empty();
        getTeachersEmails(teacherEmailResult => {
            for (i = 0; i < teacherEmailResult.length; i++) {
                $('#changeTeacher').append(`<div class="card mt-2">
                <h5 class="card-header">Teacher</h5>
                <div class="card-body">
                <h5 class="card-title">${teacherEmailResult[i].email}</h5>
                <div class="dropdown">
                <button class="btn dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Modify
                </button>
                <div class="dropdown-menu">
                <form class="px-4 py-3">
                <div class="form-group">
                    <label for="exampleDropdownFormEmail1">Change Email address</label>
                    <input type="email" class="form-control newEmail"  id="newEmailTeacher${teacherEmailResult[i].id}" placeholder="email@example.com">
                    <button class="btn btn-primary mt-1 changeTeacherEmail" value="${teacherEmailResult[i].id}">Change Email</button>
                </div>
                
                <div class="form-group">
                    <label for="exampleDropdownFormPassword1">Add Class</label>
                    <br>
                    <label class="mb-1" for="exampleDropdownFormPassword1">Class Subject</label>
                    <input type="text" class="form-control classSubject" placeholder="Class Subject">

                    <label class="mb-1" for="exampleDropdownFormPassword1">Section</label>
                    <input type="text" class="form-control section" placeholder="Section (4A, 5A, 6A, ect)">

                    <label class="mb-1" for="exampleDropdownFormPassword1">Class Location</label>
                    <input type="text" class="form-control classLocation" placeholder="Class Location">

                    <label class="mb-1" for="exampleDropdownFormPassword1">Class Time</label>
                    <input type="text" class="form-control classTime" placeholder="Class Time">

                    <label class="mb-1" for="exampleDropdownFormPassword1">Teacher Name</label>
                    <input type="text" class="form-control classTeacher" placeholder="Teacher Name">
                    <button class="btn btn-primary mt-1 changeStudentEmail" value="${teacherEmailResult[i].id}">Add Class for Teacher</button>
                </div>
                </form>
                <div class="dropdown-divider"></div>
                <button class="btn btn-danger ml-2">Delete User</button>
            </div>
            </div>
                </div>
            </div>`);
            }
        });
    }

    //get student email information and modification
    function appendStudentEmails() {
        $('#changeStudent').empty();
        getStudentEmails(studentEmailResult => {
            for (i = 0; i < studentEmailResult.length; i++) {
                $('#changeStudent').append(`<div class="card mt-2">
                <h5 class="card-header">Student</h5>
                <div class="card-body">
                <h5 class="card-title">${studentEmailResult[i].email}</h5>

                <div class="dropdown">
                <button class="btn dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Modify
                </button>
                <div class="dropdown-menu">
                <form class="px-4 py-3">
                <div class="form-group">
                    <label for="exampleDropdownFormEmail1">Change Email address</label>
                    <input type="email" class="form-control" id="newEmailStudent${studentEmailResult[i].id}" placeholder="email@example.com">
                    <button class="btn btn-primary mt-1 changeTeacherEmail" value="${studentEmailResult[i].id}">Change Email</button>
                </div>
                
                <div class="form-group">
                    <label for="exampleDropdownFormPassword1">Add Class</label>
                    <br>
                    <label class="mb-1" for="exampleDropdownFormPassword1">Class Subject</label>
                    <input type="text" class="form-control classSubject" placeholder="Class Subject">

                    <label class="mb-1" for="exampleDropdownFormPassword1">Section</label>
                    <input type="text" class="form-control section" placeholder="Section (4A, 5A, 6A, ect)">

                    <label class="mb-1" for="exampleDropdownFormPassword1">Class Location</label>
                    <input type="text" class="form-control classLocation" placeholder="Class Location">

                    <label class="mb-1" for="exampleDropdownFormPassword1">Class Time</label>
                    <input type="text" class="form-control classTime" placeholder="Class Time">
                    <button class="btn btn-primary mt-1" value="${studentEmailResult[i].id}">Add Class for Student</button>
                </div>
                </form>
                <div class="dropdown-divider"></div>
                <button class="btn btn-danger ml-2">Delete User</button>
            </div>
            </div>
                </div>
            </div>`);
            }
        });
    }

    function updateTeacherEmail(id, newEmail, cb) {
        $.ajax({
            method: 'PUT',
            url: `/emails/updateTeacherEmail/${id}`,
            data: { email: newEmail }
        }).then(result => {
            cb(result)
        });
    }

    function addTeacherEmail(email, cb) {
        $.ajax({
            method: 'POST',
            url: '/emails/teacher',
            data: { email: email }
        }).then(result => {
            cb(result);
        });
    }

    function getTeacherById(id, cb) {
        $.ajax({
            method: 'GET',
            url: `/teacherRoutes/dashboard-teacher/${id}`
        }).then(result => {
            cb(result);
        });
    }

    function getTeachersEmails(cb) {
        $.ajax({
            method: 'GET',
            url: '/emails/teacher'
        }).then(result => {
            cb(result);
        });
    }

    function searchTeacherByEmail(em, cb) {
        $.ajax({
            method: 'GET',
            url: `/teacherRoutes/searchEmail/${em}`
        }).then(result => {
            cb(result);
        });
    };

    function addStudentEmail(em, cb) {
        $.ajax({
            method: 'POST',
            url: '/emails/student',
            data: { email: em }
        }).then(result => {
            cb(result);
        });
    }

    function getStudentEmails(cb) {
        $.ajax({
            method: 'GET',
            url: '/emails/student'
        }).then(result => {
            cb(result);
        });
    }
});