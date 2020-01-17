module.exports = (sequelize, DataTypes) => {
    const Grades = sequelize.define('Grades', {
        finalGrade: DataTypes.STRING,
        quiezzesPercent: DataTypes.INTEGER,
        assingmentsPercent: DataTypes.INTEGER,
        testPercent: DataTypes.INTEGER
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