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

router.get('/login-teacher', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/loginTeacher.html'));
});

router.get('/sign-up-teacher', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/sign-up-teacher.html'));
});

module.exports = router;