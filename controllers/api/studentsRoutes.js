const express = require('express');
const router = express.Router();
const db = require('../../models');

router.get('/', (req, res) => {
    db.Students.findAll({
        include: [db.ClassInfo, db.Grades]
    }).then(studentsDb => {
        res.json(studentsDb);
    });
});

router.post('/:class', (req, res) => {
    db.Students.create({
        name: req.body.name,
        email: req.body.email,
        picture: req.body.pic,
        password: req.body.password,
        ClassId: req.params.class
    }).then(result => {
        res.json(result);
    });
});

module.exports = router;