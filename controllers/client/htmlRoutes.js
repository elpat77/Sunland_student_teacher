const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/index.html'));
});

router.get('/sign-up-student', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/sign-up-student.html'));
});

router.get('/login-student', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/loginStudent.html'));
});

router.get('/teacherlogin', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/loginTeacher.html'));
});

router.get('/teacherRegister', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/sign-up-teacher.html'));
});

router.get('/dashboard-teacher', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/dashboardTeacher.html'));
});

router.get('/classInfoTeacher', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/classInfoTeacher.html'));
});
module.exports = router;