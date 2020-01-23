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

        appendStudents();
        appendTeachers();
    };
    //---------------------------------------------------------------------------

    $('#newTeacherEmail').on('click', function () {
        $('#message').hide();
        $('#emailVal').hide();
    });

    //Changing Teacher Email Address ------------------------------------------    
    $(document).on('click', '.changeTeacherEmail', function (e) {
        e.preventDefault();
        let teacherEmailId = $(this).attr('value');
        let newEmail = $(`#newEmailTeacher${teacherEmailId}`).val();

        updateTeacherEmail(teacherEmailId, newEmail, result => {
            console.log(result);
            appendStudents();
            appendTeachers();
        });
    });
    //-------------------------------------------------------------------------

    //Changing Student Email Address ------------------------------------------
    $(document).on('click', '.changeStudentEmail', function (e) {
        e.preventDefault();
        let studentId = $(this).attr('value');
        let newEmail = $(`#newEmailStudent${studentId}`).val();

        updateStudentEmail(studentId, newEmail, result => {
            console.log(result);
            updateStudentClassEmail(studentId, newEmail, resultStudentClasses => {
                appendStudents();
                appendTeachers();
            });
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
        let studentId = $(this).attr('value');
        let studentEmail = $(this).attr('data');
        let classSubject = $(`#classSubjectStudent${studentId}`).val();
        let section = $(`#sectionStudent${studentId}`).val();
        let classLocation = $(`#classLocationStudent${studentId}`).val();
        let classTime = $(`#classTimeStudent${studentId}`).val();
        let teacherName = $(`#classStudent${studentId}`).val();

        getClassId(classSubject, teacherName, result => {
            console.log(result);
            if (result.length === 0) {
                alert('Sorry, no class found');
            } if (result.length > 1) {
                let success = false;
                let id = 2000;
                for (let i = 0; i < result.length; i++) {
                    if (section == result[i].section && classLocation == result[i].location
                        && classTime == result[i].meetTime) {
                        success = true;
                        id = result[i].id;
                        i = result.length;
                    }
                }
                if (success) {
                    addStudentClassesToClass(studentEmail, id, addedStudent => {
                        addClassInfoToStudent(studentId, classSubject, section, teacherName, classInfoResult => {
                            alert('Class Added for Student');
                        });
                    });
                } else {
                    alert('sorry, couldnt find classes');
                }
            } else {
                id = result[0].id;
                addStudentClassesToClass(studentId, id, addStudent => {
                    addClassInfoToStudent(studentId, classSubject, section, teacherName, classInfoResult => {
                        alert('Class Added for Student');
                    });
                });
            }
        });
    });
    //-------------------------------------------------------------------------

    function addStudentClassesToClass(email, classId, cb) {
        searchStudentByEmail(email, resultStudent => {
            let studentId = resultStudent.id;
            getStudentClassesById(studentId, StudentClassRes => {
                let success = false;
                for (let i = 0; i < StudentClassRes.length; i++) {
                    if (StudentClassRes[i].ClassId === null) {
                        success = true;
                        $.ajax({
                            method: 'PUT',
                            url: `/StudentClasses/addClass/${studentId}`,
                            data: { ClassId: classId }
                        }).then(result => {
                            cb(result);
                        });
                    }
                }
                if (!success) {
                    let fullName = StudentClassRes[0].name;
                    let email = StudentClassRes[0].email;
                    createStudentClassesWithClassId(classId, studentId, fullName, email, createdStudent => {
                        console.log(createdStudent);
                    });
                }
            });
        });
    }

    function createStudentClassesWithClassId(classId, studentId, fullName, email, cb) {
        $.ajax({
            method: 'POST',
            url: `/StudentClasses/${classId}`,
            data: {
                studentId: studentId,
                studentName: fullName,
                email: email
            }
        }).then(result => {
            cb(result);
        });
    }

    function getStudentClassesById(studentId, cb) {
        $.ajax({
            method: 'GET',
            url: `/StudentClasses/getById/${studentId}`
        }).then(result => {
            console.log(result);

            cb(result)
        });
    }

    //Creating Account Teachers------------------------------------------------
    $('#submitNewTeacherAccount').on('click', function (e) {
        e.preventDefault();

        let email = $('#teacherEmail').val();
        let password = $('#teacherPassword').val();
        let firstName = $('#teacherFirstName').val();
        let lastName = $('#teacherLastName').val();
        let fullName = firstName + ' ' + lastName;

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
            getTeachers(result => {
                console.log(result);
                let teachersSet = new Set();
                for (let j = 0; j < result.length; j++) {
                    teachersSet.add(result[j].email);
                }
                if (!teachersSet.has(email)) {
                    createAccountTeacher(fullName, email, password, resultAccount => {
                        appendTeachers();
                        alert('Teacher account created!');
                        $('#teacherEmail').val('');
                        $('#teacherPassword').val('');
                        $('#teacherFirstName').val('');
                        $('#teacherLastName').val('');
                    });
                } else {
                    alert('This email has an account already');
                }
            });
        }
    });
    //--------------------------------------------------------------------------------

    //Validation Teachers-------------------------------------------------------------
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

    //Creating Account Students---------------------------------------------------
    $('#submitNewStudentAccount').on('click', function (e) {
        e.preventDefault();

        let email = $('#studentEmail').val();
        let password = $('#studentPassword').val();
        let firstName = $('#studentFirstName').val();
        let lastName = $('#studentLastName').val();
        let fullName = firstName + ' ' + lastName;

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
            getStudents(result => {
                console.log(result);
                let studentSet = new Set();
                for (let j = 0; j < result.length; j++) {
                    studentSet.add(result[j].email);
                }
                if (!studentSet.has(email)) {
                    createAccountStudent(fullName, email, password, resultAccount => {
                        appendStudents();
                        let studentId = resultAccount.id;
                        console.log(resultAccount);

                        createStudentClasses(studentId, fullName, email, result => {
                            console.log(result);

                            alert('Student Account Created!');
                            $('#studentEmail').val('');
                            $('#studentPassword').val('');
                            $('#studentFirstName').val('');
                            $('#studentLastName').val('');
                        });
                    });
                } else {
                    alert('This email has an account already');
                }
            });
        }
    });
    //--------------------------------------------------------------------------------

    //Validation Students-------------------------------------------------------------
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
    //--------------------------------------------------------------------------------

    //Delete Teacher Account ---------------------------------------------------------
    $(document).on('click', '.deleteUserTeacher', function (e) {
        e.preventDefault();
        let teacherId = $(this).attr('value');
        deleteTeacherById(teacherId, result => {
            appendTeachers();
            alert('Teacher has been deleted');
        });
    });
    //--------------------------------------------------------------------------------

    //Delete Student Account ---------------------------------------------------------
    $(document).on('click', '.deleteUserStudent', function (e) {
        e.preventDefault();
        let studentId = $(this).attr('value');
        deleteStudentById(studentId, result => {
            appendStudents();
            alert('Student has been deleted');
        });
    });
    //--------------------------------------------------------------------------------

    //Edit Classes search Teacher Email-----------------------------------------------
    $('#searchIDBtn').on('click', function (e) {
        e.preventDefault();
        let teacherEmail = $('#searchByTeacherEmail').val();
        searchTeacherByEmail(teacherEmail, result => {
            console.log(result);
            $('.teacherInfo').append(`
                <div>Teacher Info:</div>
                <h6>Classes and Id: </h6>
            `);
            let classes = result.Classes;
            for (let i = 0; i < result.Classes.length; i++) {
                $('.teacherInfo').append(`
                <div>
                <h6><li>${classes[i].subject} ${classes[i].section}: ${classes[i].id}</li></h6>
                </div>
            `);
            }
        });
    });
    //--------------------------------------------------------------------------------

    //Edit Classes Search by Class Id ------------------------------------------------
    $('#searchClassBtn').on('click', function (e) {
        e.preventDefault();
        let classId = $('#searchByClass').val();
        $('.classInfoShow').empty();
        searchClassesById(classId, result => {
            console.log(result);
            if (result.length != 0) {
                $('.classInfoShow').append(`
                    <div>
                        <h5>Class Info: </h5>
                        <h6 id="updatedSubject">Subject: ${result.subject}</h6>
                        <h6 id="updatedSection">Section: ${result.section}</h6>
                        <h6 id="updatedTeacher">Teacher: ${result.teacher}</h6>
                        <h6 id="updatedLocation">Location: ${result.location}</h6>
                        <h6 id="updatedMeetTime">Meet Time: ${result.meetTime}</h6>
                    </div>
                `);
            } else {
                alert('Sorry, no class with that Id');
            }
        });
    });
    //-------------------------------------------------------------------------------

    //Update Class Subject ----------------------------------------------------------
    $('#updateSubjectBtn').on('click', function (e) {
        e.preventDefault();
        let classId = $('#searchByClass').val();
        let newSubject = $('#updateSubject').val();

        if (classId === '') {
            alert('you must enter a class id');
        }
        updateClassSubject(classId, newSubject, result => {
            console.log(result);
            alert('Subject Changed');
            $('#updateSubject').val('');
            $('#updatedSubject').text(`Subject: ${newSubject}`);
        });

    });
    //-------------------------------------------------------------------------------

    //Update Class Section ----------------------------------------------------------
    $('#updateSectionBtn').on('click', function (e) {
        e.preventDefault();
        let classId = $('#searchByClass').val();
        let newSection = $('#updateSection').val();

        if (classId === '') {
            alert('you must enter a class id');
        }
        updateClassSection(classId, newSection, result => {
            console.log(result);
            alert('Section Changed');
            $('#updateSection').val('');
            $('#updatedSection').text(`Section: ${newSection}`);
        });
    });
    //-------------------------------------------------------------------------------

    //Update Class Location ----------------------------------------------------------
    $('#updateLocationBtn').on('click', function (e) {
        e.preventDefault();
        let classId = $('#searchByClass').val();
        let newLocation = $('#updateLocation').val();

        if (classId === '') {
            alert('you must enter a class id');
        }
        updateClassLocation(classId, newLocation, result => {
            console.log(result);
            alert('Location Changed');
            $('#updateLocation').val('');
            $('#updatedLocation').text(`Location: ${newLocation}`);
        });
    });
    //-------------------------------------------------------------------------------

    //Update Class Time -------------------------------------------------------------
    $('#updateClassTimeBtn').on('click', function (e) {
        e.preventDefault();
        let classId = $('#searchByClass').val();
        let newClassTime = $('#updateClassTime').val();

        if (classId === '') {
            alert('you must enter a class id');
        }
        updateClassTime(classId, newClassTime, result => {
            console.log(result);
            alert('Time Changed');
            $('#updateClassTime').val('');
            $('#updatedMeetTime').text(`Meet Time: ${newClassTime}`);
        });
    });
    //-------------------------------------------------------------------------------

    //Make Announcements ------------------------------------------------------------
    $('#submitNewAnnouncement').on('click', function (e) {
        e.preventDefault();
        let title = $('#newAnnouncemetTitle').val();
        let text = $('#newAnnouncementContent').val();
        $.ajax({
            method: 'POST',
            url: '/adminAnnouncements',
            data: {
                title: title,
                data: text
            }
        }).then(result => {
            console.log(result);
        });
    });
    //-------------------------------------------------------------------------------

    $('#logOut').on('click', function (e) {
        e.preventDefault();
        window.location.href = '/'
    });

    function updateClassSubject(classId, newSubject, cb) {
        $.ajax({
            method: 'PUT',
            url: `/classesRoutes/changeSubject/${classId}`,
            data: { subject: newSubject }
        }).then(result => {
            cb(result);
        });
    }

    function updateClassSection(classId, newSection, cb) {
        $.ajax({
            method: 'PUT',
            url: `/classesRoutes/changeSection/${classId}`,
            data: { section: newSection }
        }).then(result => {
            cb(result);
        });
    }

    function updateClassLocation(classId, newLocation, cb) {
        $.ajax({
            method: 'PUT',
            url: `/classesRoutes/changeLocation/${classId}`,
            data: { location: newLocation }
        }).then(result => {
            cb(result);
        });
    }

    function updateClassTime(classId, newClassTime, cb) {
        $.ajax({
            method: 'PUT',
            url: `/classesRoutes/changeTime/${classId}`,
            data: { meetTime: newClassTime }
        }).then(result => {
            cb(result);
        });
    }

    function searchClassesById(classId, cb) {
        $.ajax({
            method: 'GET',
            url: `/classesRoutes/searchClassById/${classId}`,
        }).then(result => {
            cb(result);
        });
    }

    function getClassId(subject, teacher, cb) {
        $.ajax({
            method: 'GET',
            url: `/classesRoutes/getClassBySubject/${subject}/${teacher}`
        }).then(result => {
            cb(result);
        });
    }

    //appending emails
    //get teacher email information and modification
    function appendTeachers() {
        $('#changeTeacher').empty();
        getTeachers(teacherResult => {
            for (i = 0; i < teacherResult.length; i++) {
                $('#changeTeacher').append(`<div class="card mt-2">
                <h5 class="card-header">Teacher</h5>
                <div class="card-body">
                <h5 class="card-title">${teacherResult[i].name}</h5>
                <h6 class="card-title">${teacherResult[i].email}</h6>
                <div class="dropdown">
                <button class="btn dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Modify
                </button>
                <div class="dropdown-menu">
                <form class="px-4 py-3">
                <div class="form-group">
                    <label for="exampleDropdownFormEmail1">Change Email address</label>
                    <input type="email" class="form-control newEmai"  id="newEmailTeacher${teacherResult[i].id}" placeholder="email@example.com">
                    <button class="btn btn-primary mt-1 changeTeacherEmail" value="${teacherResult[i].id}">Change Email</button>
                </div>
                
                <div class="form-group">
                    <label for="exampleDropdownFormPassword1">Add Class</label>
                    <br>
                    <label class="mb-1" for="exampleDropdownFormPassword1">Class Subject</label>
                    <input type="text" class="form-control classSubject" id="classSubjectTeacher${teacherResult[i].id}" placeholder="Class Subject">

                    <label class="mb-1" for="exampleDropdownFormPassword1">Section</label>
                    <input type="text" class="form-control section" id="sectionTeacher${teacherResult[i].id}" placeholder="Section (4A, 5A, 6A, ect)">

                    <label class="mb-1" for="exampleDropdownFormPassword1">Class Location</label>
                    <input type="text" class="form-control classLocation" id="classLocationTeacher${teacherResult[i].id}" placeholder="Class Location">

                    <label class="mb-1" for="exampleDropdownFormPassword1">Class Time</label>
                    <input type="text" class="form-control classTime" id="classTimeTeacher${teacherResult[i].id}" placeholder="Class Time">

                    <label class="mb-1" for="exampleDropdownFormPassword1">Teacher Name</label>
                    <input type="text" class="form-control classTeacher" id="classTeacher${teacherResult[i].id}" placeholder="Teacher Name">

                    <button class="btn btn-primary mt-1 addClassTeacher" data="${teacherResult[i].email}" value="${teacherResult[i].id}">Add Class for Teacher</button>
                </div>
                </form>
                <div class="dropdown-divider"></div>
                <button class="btn btn-danger ml-2 deleteUserTeacher" value= "${teacherResult[i].id}">Delete User</button>
            </div>
            </div>
                </div>
            </div>`);
            }
        });
    }

    //get student email information and modification
    function appendStudents() {
        $('#changeStudent').empty();
        getStudents(studentResult => {
            for (i = 0; i < studentResult.length; i++) {
                $('#changeStudent').append(`<div class="card mt-2">
                <h5 class="card-header">Student</h5>
                <div class="card-body">
                <h5 class="card-title">${studentResult[i].name}</h5>
                <h6 class="card-title">${studentResult[i].email}</h6>
                <div class="dropdown">
                <button class="btn dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Modify
                </button>
                <div class="dropdown-menu">
                <form class="px-4 py-3">
                <div class="form-group">
                    <label for="exampleDropdownFormEmail1">Change Email address</label>
                    <input type="email" class="form-control" id="newEmailStudent${studentResult[i].id}" placeholder="email@example.com">
                    <button class="btn btn-primary mt-1 changeStudentEmail" value="${studentResult[i].id}">Change Email</button>
                </div>
                
                <div class="form-group">
                    <label for="exampleDropdownFormPassword1">Add Class</label>
                    <br>
                    <label class="mb-1" for="exampleDropdownFormPassword1">Class Subject</label>
                    <input type="text" class="form-control classSubject" id="classSubjectStudent${studentResult[i].id}" placeholder="Class Subject">

                    <label class="mb-1" for="exampleDropdownFormPassword1">Section</label>
                    <input type="text" class="form-control section" id="sectionStudent${studentResult[i].id}" placeholder="Section (4A, 5A, 6A, ect)">

                    <label class="mb-1" for="exampleDropdownFormPassword1">Class Location</label>
                    <input type="text" class="form-control classLocation" id="classLocationStudent${studentResult[i].id}"placeholder="Class Location">

                    <label class="mb-1" for="exampleDropdownFormPassword1">Class Time</label>
                    <input type="text" class="form-control classTime" id="classTimeStudent${studentResult[i].id}" placeholder="Class Time">

                    <label class="mb-1" for="exampleDropdownFormPassword1">Teacher Name</label>
                    <input type="text" class="form-control classTeacher" id="classStudent${studentResult[i].id}" placeholder="Teacher Name">
                    <button class="btn btn-primary mt-1 addClassStudent" data="${studentResult[i].email}" value="${studentResult[i].id}">Add Class for Student</button>
                </div>
                </form>
                <div class="dropdown-divider"></div>
                <button class="btn btn-danger ml-2 deleteUserStudent" value="${studentResult[i].id}">Delete User</button>
            </div>
            </div>
                </div>
            </div>`);
            }
        });
    }

    //Teachers------------------------------------------------------------

    function getTeachers(cb) {
        $.ajax({
            method: 'GET',
            url: '/teacherRoutes',
        }).then(result => {
            cb(result);
        });
    }

    function updateTeacherEmail(id, newEmail, cb) {
        $.ajax({
            method: 'PUT',
            url: `/teacherRoutes/updateTeacherEmail/${id}`,
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


    function createAccountTeacher(fullName, email, password, cb) {
        $.ajax({
            method: 'POST',
            url: '/teacherRoutes',
            data: {
                name: fullName,
                email: email,
                password: password,
                picture: null
            }
        }).then(res => {
            cb(res);
        });
    };

    function deleteTeacherById(teacherId, cb) {
        $.ajax({
            method: 'DELETE',
            url: `/teacherRoutes/delete/${teacherId}`
        }).then(result => {
            cb(result);
        });
    }

    //Students-------------------------------------------------
    function updateStudentEmail(id, newEmail, cb) {
        $.ajax({
            method: 'PUT',
            url: `/studentsRoutes/updateStudentEmail/${id}`,
            data: { email: newEmail }
        }).then(result => {
            cb(result);
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

    function getStudents(cb) {
        $.ajax({
            method: 'GET',
            url: '/studentsRoutes'
        }).then(result => {
            cb(result);
        });
    }

    function createAccountStudent(fullName, email, password, cb) {
        $.ajax({
            method: 'POST',
            url: '/studentsRoutes',
            data: {
                name: fullName,
                email: email,
                password: password,
                picture: null
            }
        }).then(result => {
            cb(result);
        });
    }

    function addClassInfoToStudent(studentId, name, section, teacher, cb) {
        $.ajax({
            method: 'POST',
            url: `/classInfoRoutes/${studentId}`,
            data: {
                name: name,
                section: section,
                teacher: teacher,
            }
        }).then(result => {
            cb(result);
        });
    }

    function deleteStudentById(teacherId, cb) {
        $.ajax({
            method: 'DELETE',
            url: `/studentsRoutes/delete/${teacherId}`
        }).then(result => {
            cb(result);
        });
    }

    function updateStudentClassEmail(id, em, cb) {
        $.ajax({
            method: 'PUT',
            url: `/StudentClasses/changeEmail/${id}`,
            data: { email: em }
        }).then(result => {
            cb(result);
        });
    }

    function createStudentClasses(studentId, fullName, email, cb) {
        $.ajax({
            method: 'POST',
            url: '/StudentClasses',
            data: {
                studentId: studentId,
                name: fullName,
                email: email
            }
        }).then(result => {
            cb(result);
        });
    }

});