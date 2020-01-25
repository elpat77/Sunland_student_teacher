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

router.get('/byClassId/:id', (req, res) => {
    db.Grades.findAll({
        where: { idClass: req.params.id }
    }).then(result => {
        res.json(result);
    });
});

router.delete('/deleteGrades/:id', (req, res) => {
    db.Grades.destroy({
        where: { idClass: req.params.id }
    }).then(result => {
        res.json(result);
    });
});

router.post('/:id', (req, res) => {
    db.Grades.create({
        idClass: req.body.idClass,
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