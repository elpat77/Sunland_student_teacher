module.exports = (sequelize, DataTypes) => {
    const Grades = sequelize.define('Grades', {
    });

    Grades.associate = models => {
        Grades.hasMany(models.Assignments, {
            onDelete: 'cascade'
        });
        Grades.hasMany(models.Tests, {
            onDelete: 'cascade'
        });
        Grades.hasMany(modes.Quizzes, {
            onDelete: 'cascade'
        });
    }

    return Grades;
}