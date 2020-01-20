const express = require('express');
const router = express.Router();
const db = require('../../models');

router.get('/teacherEmails', (req, res) => {
    db.TeacherEmails.findAll({}).then(teacherEmailsDb => {
        res.json(teacherEmailsDb);
    });
});

router.post('/teacherEmails', (req, res) => {
    db.TeacherEmails.create({
        email: req.body.email
    }).then(result => {
        res.json(result);
    });
});

router.get('/studentEmails', (req, res) => {
    db.StudentEmails.findAll({}).then(studentEmailsdb => {
        res.json(studentEmailsdb);
    });
});

router.post('/studentEmails', (req, res) => {
    db.StudentEmails.create({
        email: req.body.email
    }).then(result => {
        res.json(result);
    });
});

module.exports = router;