const express = require('express');
const router = express.Router();
const db = require('../../models');

router.get('/', (req, res) => {
    db.Quizzes.findAll({}).then(quizzesDb => {
        res.json(quizzesDb);
    });
});

router.post('/:id', (req, res) => {
    db.Quizzes.create({
        name: req.body.name,
        totalPoints: req.body.totalPoints,
        scored: req.body.scored,
        grade: req.body.grade,
        date: req.body.date,
        GradeId: req.params.id
    }).then(result => {
        res.json(result);
    });
});

module.exports = router;