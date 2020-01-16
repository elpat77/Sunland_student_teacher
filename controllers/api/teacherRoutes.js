const express = require('express');
const router = express.Router();
const db = require('../../models');

router.get('/', (req, res) => {
    db.Teacher.findAll({
        include: [db.Classes]
    }).then(dbTeachers => {
        res.json(dbTeachers);
    });
});

router.post('/', (req, res) => {
    db.Teacher.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        picture: req.body.picture
    }).then(result => {
        res.json(result);
    });
});

module.exports = router;