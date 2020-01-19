const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const db = require('./models');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./views'));

const teacherRoutes = require('./controllers/api/teacherRoutes');
app.use('/teacherRoutes', teacherRoutes);

const classesRoutes = require('./controllers/api/classesRoutes');
app.use('/classesRoutes', classesRoutes);

const announcementRoutes = require('./controllers/api/announcementRoutes');
app.use('/announcementRoutes', announcementRoutes);

const assignmentsRoutes = require('./controllers/api/assignmentsRoutes');
app.use('/assignmentsRoutes', assignmentsRoutes);

const gradesRoutes = require('./controllers/api/gradesRoutes');
app.use('/gradesRoutes', gradesRoutes);

const studentsRoutes = require('./controllers/api/studentsRoutes');
app.use('/studentsRoutes', studentsRoutes);

const classInfoRoutes = require('./controllers/api/classInfoRoutes');
app.use('/classInfoRoutes', classInfoRoutes);

const quizzesRoutes = require('./controllers/api/quizzesRoutes');
app.use('/quizzesRoutes', quizzesRoutes);

const htmlRoutes = require('./controllers/client/htmlRoutes');
app.use('/', htmlRoutes);

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on http://localhost:${PORT}`);
    });
});
