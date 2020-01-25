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

router.post('/', (req, res) => {
    db.Students.create({
        name: req.body.name,
        email: req.body.email,
        picture: req.body.pic,
        password: req.body.password
    }).then(result => {
        res.json(result);
    });
});

router.put('/updateStudentEmail/:id', (req, res) => {
    db.Students.update(
        { email: req.body.email },
        { where: { id: req.params.id } }
    ).then(result => {
        res.json(result);
    });
});

router.post('/', (req, res) => {
    db.Students.create({
        name: req.body.name,
        email: req.body.email,
        picture: req.body.pic,
        password: req.body.password
    }).then(result => {
        res.json(result);
    });
});

router.get('/searchEmail/:id', (req, res) => {
    db.Students.findOne({
        where: {
            email: req.params.id
        },
        include: [db.ClassInfo, db.Grades]
    }).then(result => {
        res.json(result);
    });
});

router.delete('/delete/:id', (req, res) => {
    db.Students.destroy({
        where: { id: req.params.id }
    }).then(result => {
        res.json(result);
    });
});


module.exports = router;