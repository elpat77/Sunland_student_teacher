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
                appendStudentEmails();
                appendTeacherEmails();
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
                appendStudentEmails();
                appendTeacherEmails();
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

        updateTeacherEmail(teacherEmailId, newEmail, result => {
            console.log(result);
            appendStudentEmails();
            appendTeacherEmails();
        });
    });
    //-------------------------------------------------------------------------

    //Changing Student Email Address ------------------------------------------
    $(document).on('click', '.changeStudentEmail', function (e) {
        e.preventDefault();
        let studentEmailId = $(this).attr('value');
        let newEmail = $(`#newEmailStudent${studentEmailId}`).val();

        updateStudentEmail(studentEmailId, newEmail, result => {
            console.log(result);
            appendStudentEmails();
            appendTeacherEmails();
        });
    });
    //-------------------------------------------------------------------------

    //adding classes to teachers ----------------------------------------------
    $(document).on('click', '.addClassTeacher', function (e) {
        e.preventDefault();
        let teacherEmailId = $(this).attr('value');
        let currentEmail = $(this).attr('data');
        let classSubject = $(`#classSubjectTeacher${teacherEmailId}`).val();
        let section = $(`#sectionTeacher${teacherEmailId}`).val();
        let classLocation = $(`#classLocationTeacher${teacherEmailId}`).val();
        let classTime = $(`#classTimeTeacher${teacherEmailId}`).val();
        let teacherName = $(`#classTeacher${teacherEmailId}`).val();

        searchTeacherByEmail(currentEmail, resultTeacher => {
            console.log(resultTeacher);
            if (resultTeacher != null) {
                let teacherId = resultTeacher.id;
                addClassesToTeacher(teacherId, classSubject, section, teacherName, classLocation, classTime, resultClass => {
                    console.log(resultClass);
                });
            } else {
                alert('That teacher must create an account');
            }
        });
    });
    //-------------------------------------------------------------------------

    //adding classes to students ----------------------------------------------
    $(document).on('click', '.addClassStudent', function (e) {
        e.preventDefault();
        let studentEmailId = $(this).attr('value');
        let studentEmail = $(this).attr('data');
        let classSubject = $(`#classSubjectStudent${studentEmailId}`).val();
        let section = $(`#sectionStudent${studentEmailId}`).val();
        let classLocation = $(`#classLocationStudent${studentEmailId}`).val();
        let classTime = $(`#classTimeStudent${studentEmailId}`).val();
        let teacherName = $(`#classStudent${studentEmailId}`).val();

        searchStudentByEmail(studentEmail, resultStudent => {
            console.log(resultStudent);
            if (resultStudent != null) {
                let studentId = resultStudent.id;
                addClassInfoToStudent(studentId, classSubject, section, teacherName, resultClassInfo => {
                    console.log(resultClassInfo);
                });
                let studentClassId = resultStudent.ClassId;
                //crate students first
                //addStudentToClass();
            } else {
                alert('That student must create an account/no such email');
            }
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
                    <input type="email" class="form-control newEmai"  id="newEmailTeacher${teacherEmailResult[i].id}" placeholder="email@example.com">
                    <button class="btn btn-primary mt-1 changeTeacherEmail" value="${teacherEmailResult[i].id}">Change Email</button>
                </div>
                
                <div class="form-group">
                    <label for="exampleDropdownFormPassword1">Add Class</label>
                    <br>
                    <label class="mb-1" for="exampleDropdownFormPassword1">Class Subject</label>
                    <input type="text" class="form-control classSubject" id="classSubjectTeacher${teacherEmailResult[i].id}" placeholder="Class Subject">

                    <label class="mb-1" for="exampleDropdownFormPassword1">Section</label>
                    <input type="text" class="form-control section" id="sectionTeacher${teacherEmailResult[i].id}" placeholder="Section (4A, 5A, 6A, ect)">

                    <label class="mb-1" for="exampleDropdownFormPassword1">Class Location</label>
                    <input type="text" class="form-control classLocation" id="classLocationTeacher${teacherEmailResult[i].id}" placeholder="Class Location">

                    <label class="mb-1" for="exampleDropdownFormPassword1">Class Time</label>
                    <input type="text" class="form-control classTime" id="classTimeTeacher${teacherEmailResult[i].id}" placeholder="Class Time">

                    <label class="mb-1" for="exampleDropdownFormPassword1">Teacher Name</label>
                    <input type="text" class="form-control classTeacher" id="classTeacher${teacherEmailResult[i].id}" placeholder="Teacher Name">

                    <button class="btn btn-primary mt-1 addClassTeacher" data="${teacherEmailResult[i].email}" value="${teacherEmailResult[i].id}">Add Class for Teacher</button>
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
                    <button class="btn btn-primary mt-1 changeStudentEmail" value="${studentEmailResult[i].id}">Change Email</button>
                </div>
                
                <div class="form-group">
                    <label for="exampleDropdownFormPassword1">Add Class</label>
                    <br>
                    <label class="mb-1" for="exampleDropdownFormPassword1">Class Subject</label>
                    <input type="text" class="form-control classSubject" id="classSubjectStudent${studentEmailResult[i].id}" placeholder="Class Subject">

                    <label class="mb-1" for="exampleDropdownFormPassword1">Section</label>
                    <input type="text" class="form-control section" id="sectionStudent${studentEmailResult[i].id}" placeholder="Section (4A, 5A, 6A, ect)">

                    <label class="mb-1" for="exampleDropdownFormPassword1">Class Location</label>
                    <input type="text" class="form-control classLocation" id="classLocationStudent${studentEmailResult[i].id}"placeholder="Class Location">

                    <label class="mb-1" for="exampleDropdownFormPassword1">Class Time</label>
                    <input type="text" class="form-control classTime" id="classTimeStudent${studentEmailResult[i].id}" placeholder="Class Time">

                    <label class="mb-1" for="exampleDropdownFormPassword1">Teacher Name</label>
                    <input type="text" class="form-control classTeacher" id="classStudent${studentEmailResult[i].id}" placeholder="Teacher Name">
                    <button class="btn btn-primary mt-1" data="${studentEmailResult[i].email}" value="${studentEmailResult[i].id}">Add Class for Student</button>
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

    //Teachers------------------------------------------------------------
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

    function addClassesToTeacher(id, subject, section, teacher, location, meetTime, cb) {
        $.ajax({
            method: 'POST',
            url: `/classesRoutes/${id}`,
            data: {
                subject: subject,
                section: section,
                teacher: teacher,
                location: location,
                meetTime: meetTime
            }
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

    //Students-------------------------------------------------
    function updateStudentEmail(id, newEmail, cb) {
        $.ajax({
            method: 'PUT',
            url: `/emails/updateStudentEmail/${id}`,
            data: { email: newEmail }
        }).then(result => {
            cb(result)
        });
    }

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

    function searchStudentByEmail(em, cb) {
        $.ajax({
            method: 'GET',
            url: `/studentsRoutes/searchEmail/${em}`
        }).then(result => {
            cb(result);
        });
    }

    function addClassInfoToStudent(id, name, section, teacher, cb) {
        $.ajax({
            method: 'POST',
            url: `/classInfoRoutes/${id}`,
            data: {
                name: name,
                section: section,
                teacher: teacher
            }
        }).then(result => {
            cb(result);
        });
    }



    // function addStudentToClass() {
    //     $.ajax({
    //         method: 'POST',

    //     }).then();
    // }
});