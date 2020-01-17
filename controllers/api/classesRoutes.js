const express = require('express');
const router = express.Router();
const db = require('../../models');

router.get('/', (req, res) => {
    db.Classes.findAll({
        include: [db.Announcements, db.Students]
    }).then(dbClasses => {
        res.json(dbClasses);
    });
});

router.post('/:id', (req, res) => {
    db.Classes.create({
        subject: req.body.subject,
        section: req.body.section,
        teacher: req.body.teacher,
        TeacherId: req.params.id,
    }).then(result => {
        res.json(result);
    });
});

module.exports = router;