const express = require('express');
const router = express.Router();
const path = require('path');

//homepage
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/index.html'));
});

//students
router.get('/sign-up-student', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/sign-up-student.html'));
});

router.get('/login-student', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/loginStudent.html'));
});

router.get('/dashboardStudent', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/dashboardStudent.html'));
});

//teachers
router.get('/teacherlogin', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/loginTeacher.html'));
});

router.get('/dashboard-teacher', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/dashboardTeacher.html'));
});

router.get('/classInfoTeacher', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/classInfoTeacher.html'));
});

router.get('/gradesTeacher', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/gradesTeacher.html'));
});

//admin
router.get('/loginAdmin', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/loginAdmin.html'));
});

router.get('/adminDashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/adminDashboard.html'));
});


module.exports = router;