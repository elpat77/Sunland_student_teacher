module.exports = (sequelize, DataTypes) => {
    const StudentEmails = sequelize.define('StudentEmails', {
        email: DataTypes.STRING
    });
    return StudentEmails;
}