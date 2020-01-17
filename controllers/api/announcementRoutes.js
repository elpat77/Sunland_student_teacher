const express = require('express');
const router = express.Router();
const db = require('../../models');

router.get('/', (req, res) => {
    db.Announcements.findAll({}).then(announcementDb => {
        res.send(announcementDb);
    });
});

router.post('/:id', (req, res) => {
    db.Announcements.create({
        title: req.body.title,
        body: req.body.body,
        ClassId: req.params.id
    }).then(result => {
        res.send(result);
    });
});

module.exports = router;