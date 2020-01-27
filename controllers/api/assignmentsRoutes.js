const express = require('express');
const router = express.Router();
const db = require('../../models');

router.get('/', (req, res) => {
    db.Assignments.findAll({}).then(assignmentsDb => {
        res.json(assignmentsDb);
    });
});

router.post('/:grade/', (req, res) => {
    db.Assignments.create({
        dueDate: req.body.date,
        title: req.body.title,
        timeDue: req.body.time,
        description: req.body.description,
        turnedIn: req.body.turnedIn,
        grade: req.body.grade,
        totalPoints: req.body.totalPoints,
        scored: req.body.scored,
        GradeId: req.params.grade
    }).then(result => {
        res.json(result);
    });
});

router.put('/updateTime/:id', (req, res) => {
    db.Assignments.update({
        timeDue: req.body.timeDue
    },
        {
            where: { GradeId: req.params.id }
        }
    ).then(result => {
        res.json(result);
    });
});

router.put('/updateDueDate/:id', (req, res) => {
    db.Assignments.update({
        dueDate: req.body.dueDate
    },
        {
            where: { GradeId: req.params.id }
        }).then(result => {
            res.json(result);
        });
});

module.exports = router;