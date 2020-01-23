const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../../models');

router.get('/', (req, res) => {
    db.Teacher.findAll({
        include: [db.Classes]
    }).then(dbTeachers => {
        res.json(dbTeachers);
    });
});

router.get('/searchById/:id', (req, res) => {
    db.Teacher.findOne({
        where: { id: req.params.id }
    }).then(result => {
        res.json(result);
    });
});

router.get('/dashboard-teacher/:id', (req, res) => {
    db.Teacher.findAll({
        where: {
            id: req.params.id
        },
        include: [db.Classes]
    }).then(result => {
        res.json(result);
    });
});

router.post('/', (req, res) => {
    db.Teacher.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        picture: req.body.picture
    }, {
        include: [db.Classes]
    }).then(result => {
        res.json(result);
    });

    //async
    // const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // try { } catch {
    //     res.redirect('/register');}
});

//search by email
router.get('/searchEmail/:id', (req, res) => {
    db.Teacher.findOne({
        where: {
            email: req.params.id
        },
        include: [db.Classes]
    }).then(result => {
        res.json(result);
    });
});

router.put('/updateTeacherEmail/:id', (req, res) => {
    db.Teacher.update({
        email: req.body.email
    },
        {
            where: { id: req.params.id }
        }).then(result => {
            res.json(result);
        });
});

router.put('/changePassword/:id', (req, res) => {
    db.Teacher.update({
        password: req.body.password
    }, {
        where: { id: req.params.id }
    }).then(result => {
        res.json(result);
    });
});

router.put('/changeName/:id', (req, res) => {
    db.Teacher.update({
        name: req.body.name
    }, {
        where: { id: req.params.id }
    }).then(result => {
        res.json(result);
    });
});

router.delete('/delete/:id', (req, res) => {
    db.Teacher.destroy({
        where: { id: req.params.id }
    }).then(result => {
        res.json(result);
    });
});

module.exports = router;