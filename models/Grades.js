module.exports = (sequelize, DataTypes) => {
    const Grades = sequelize.define('Grades', {
        finalGrade: DataTypes.STRING,
        quizzesPercent: DataTypes.INTEGER,
        assignmentsPercent: DataTypes.INTEGER,
        testPercent: DataTypes.INTEGER
    });

    Grades.associate = models => {
        Grades.hasMany(models.Assignments, {
            onDelete: 'cascade'
        });
        Grades.hasMany(models.Tests, {
            onDelete: 'cascade'
        });
        Grades.hasMany(models.Quizzes, {
            onDelete: 'cascade'
        });
        Grades.belongsTo(models.Students, {
            foreignKey: {
                allowNull: false
            }
        });
    }

    return Grades;
}