const express = require('express');
const router = express.Router();
const db = require('../../models');

router.get('/', (req, res) => {
    db.AdminAnnouncements.findAll({}).then(result => {
        res.json(result);
    });
});

router.post('/', (req, res) => {
    db.AdminAnnouncements.create({
        title: req.body.title,
        body: req.body.body
    }).then(result => {
        res.json(result);
    });
});

module.exports = router;