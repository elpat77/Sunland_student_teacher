const express = require('express');
const router = express.Router();
const db = require('../../models');

router.get('/', (req, res) => {
    db.Tests.findAll({}).then(testDb => {
        res.json(testDb);
    });
});

router.get('/:id', (req, res) => {
    db.Tests.findOne({
        where: { id: req.params.id }
    }).then(result => {
        res.json(result);
    });
});

router.post('/:id', (req, res) => {
    db.Tests.create({
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

router.put('/updateGrade/:id', (req, res) => {
    db.Tests.update({
        grade: req.body.grade,
        scored: req.body.scored
    }, {
        where: { id: req.params.id }
    }).then(result => {
        res.json(result);
    });
});

module.exports = router;