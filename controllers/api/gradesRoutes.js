const express = require('express');
const router = express.Router();
const db = require('../../models');

router.get('/', (req, res) => {
    db.Grades.findAll({
        include: [db.Assignments, db.Tests, db.Quizzes]
    }).then(gradesDb => {
        res.json(gradesDb);
    });
});

router.post('/:id', (req, res) => {
    db.Grades.create({
        finalGrade: req.body.finalGrade,
        quizzesPercent: req.body.qp,
        assignmentsPercent: req.body.ap,
        testPercent: req.body.testPercent,
        StudentId: req.params.id
    }).then(result => {
        res.json(result);
    });
});

module.exports = router;