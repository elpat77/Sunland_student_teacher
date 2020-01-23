const express = require('express');
const router = express.Router();
const db = require('../../models');

router.get('/', (req, res) => {
    db.Assignments.findAll({}).then(assignmentsDb => {
        res.json(assignmentsDb);
    });
});

router.post('/:grade/:Classid', (req, res) => {
    db.Assignments.create({
        dueDate: req.body.date,
        title: req.body.title,
        timeDue: req.body.time,
        description: req.body.description,
        turnedIn: req.body.turnedIn,
        grade: req.body.grade,
        totalPoints: req.body.totalPoints,
        scored: req.body.scored,
        ClassId: req.params.Classid,
        GradeId: req.params.grade
    }).then(result => {
        res.json(result);
    });
});

module.exports = router;