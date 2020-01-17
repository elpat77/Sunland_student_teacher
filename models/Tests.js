module.exports = (sequelize, DataTypes) => {
    const Tests = sequelize.define('Tests', {
        name: DataTypes.STRING,
        totalScore: DataTypes.INTEGER,
        scored: DataTypes.INTEGER,
        grade: DataTypes.STRING
    });

    Tests.associate = models => {
        Tests.belongsTo(models.Grades, {
            foreignKey: {
                allowNull: false
            }
        });
    }

    return Tests;
}