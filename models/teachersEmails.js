module.exports = (sequelize, DataTypes) => {
    const TeacherEmails = sequelize.define('TeacherEmails', {
        email: DataTypes.STRING
    });

    return TeacherEmails;
}