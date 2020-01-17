module.exports = (sequelize, DataTypes) => {
    const Quizzes = sequelize.define('Quizzes', {
        name: DataTypes.STRING,
        totalPoints: DataTypes.INTEGER,
        scored: DataTypes.INTEGER,
        grade: DataTypes.STRING
    });

    Quizzes.associate = models => {
        Quizzes.belongsTo(models.Grades, {
            foreignKey: {
                allowNull: false
            }
        });
    }

    return Quizzes;
}