const express = require('express');
const router = express.Router();
const db = require('../../models');

router.get('/teacher', (req, res) => {
    db.TeacherEmails.findAll({}).then(teacherEmailsDb => {
        res.json(teacherEmailsDb);
    });
});

router.post('/teacher', (req, res) => {
    db.TeacherEmails.create({
        email: req.body.email
    }).then(result => {
        res.json(result);
    });
});

router.put('/updateTeacherEmail/:id', (req, res) => {
    db.TeacherEmails.update({
        email: req.body.email
    },
        {
            where: { id: req.params.id }
        }).then(result => {
            res.json(result);
        });
});

router.get('/student', (req, res) => {
    db.StudentEmails.findAll({}).then(studentEmailsdb => {
        res.json(studentEmailsdb);
    });
});

router.post('/student', (req, res) => {
    db.StudentEmails.create({
        email: req.body.email
    }).then(result => {
        res.json(result);
    });
});

module.exports = router;