const express = require('express');
const router = express.Router();
const db = require('../../models');

router.get('/', (req, res) => {
    db.Classes.findAll({
        include: [db.Announcements, db.StudentClasses]
    }).then(dbClasses => {
        res.json(dbClasses);
    });
});

router.get('/searchClassById/:id', (req, res) => {
    db.Classes.findOne({
        where: { id: req.params.id },
        include: [db.StudentClasses]
    }).then(result => {
        res.json(result);
    });
});

router.post('/:id', (req, res) => {
    db.Classes.create({
        subject: req.body.subject,
        section: req.body.section,
        teacher: req.body.teacher,
        location: req.body.location,
        meetTime: req.body.meetTime,
        TeacherId: req.params.id
    }).then(result => {
        res.json(result);
    });
});

router.get('/getClassBySubject/:subject/:teacher', (req, res) => {
    db.Classes.findAll({
        where: {
            teacher: req.params.teacher,
            subject: req.params.subject
        }
    }).then(result => {
        res.json(result);
    });
});


router.put('/changeSubject/:id', (req, res) => {
    db.Classes.update({
        subject: req.body.subject
    },
        {
            where: {
                id: req.params.id
            }
        }).then(result => {
            res.json(result);
        });
});

router.put('/changeSection/:id', (req, res) => {
    db.Classes.update({
        section: req.body.section
    }, {
        where: { id: req.params.id }
    }).then(result => {
        res.json(result);
    });
});

router.put('/changeLocation/:id', (req, res) => {
    db.Classes.update({
        location: req.body.location
    }, {
        where: { id: req.params.id }
    }).then(result => {
        res.json(result);
    });
});

router.put('/changeTime/:id', (req, res) => {
    db.Classes.update({
        meetTime: req.body.meetTime
    }, {
        where: { id: req.params.id }
    }).then(result => {
        res.json(result);
    });
});

module.exports = router;