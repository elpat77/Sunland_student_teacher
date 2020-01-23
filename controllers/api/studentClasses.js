const express = require('express');
const router = express.Router();
const db = require('../../models');

router.get('/', (req, res) => {
    db.StudentClasses.findAll({}).then(result => {
        res.json(result);
    });
});

router.get('/getById/:id', (req, res) => {
    db.StudentClasses.findAll({
        where: { studentId: req.params.id }
    }).then(result => {
        res.json(result);
    });
});

router.post('/', (req, res) => {
    db.StudentClasses.create({
        studentId: req.body.studentId,
        studentName: req.body.name,
        email: req.body.email
    }).then(result => {
        res.json(result);
    });
});

router.post('/:id', (req, res) => {
    db.StudentClasses.create({
        studentId: req.body.studentId,
        studentName: req.body.name,
        email: req.body.email,
        ClassId: req.params.id
    }).then(result => {
        res.json(result);
    });
});

router.post('/changeEmail/:id', (req, res) => {
    db.StudentClasses.update({
        email: req.body.email
    }, {
        where: { id: req.params.id }
    }).then(result => {
        res.json(result);
    });
});

router.put('/addClass/:id', (req, res) => {
    db.StudentClasses.update({
        ClassId: req.body.id
    }, {
        where: { id: req.params.id }
    }).then(result => {
        res.json(result);
    });
});

router.delete('/delete/:id', (req, res) => {
    db.StudentClasses.destroy({
        where: req.params.id
    }).then(result => {
        res.json(result);
    });
});

module.exports = router;