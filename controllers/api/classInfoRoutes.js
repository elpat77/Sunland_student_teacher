const express = require('express');
const router = express.Router();
const db = require('../../models');

router.get('/', (req, res) => {
    db.ClassInfo.findAll({}).then(classInfoDb => {
        res.json(classInfoDb);
    });
});

router.post('/:id', (req, res) => {
    db.ClassInfo.create({
        classId: req.body.classId,
        name: req.body.name,
        section: req.body.section,
        teacher: req.body.teacher,
        StudentId: req.params.id
    }).then(result => {
        res.json(result);
    });
});

router.put('/updateClassId/:id', (req, res) => {
    db.ClassInfo.update({
        classId: req.body.classId
    }, {
        where: { id: req.params.id }
    }).then(result => {
        res.json(result);
    });
});

module.exports = router;