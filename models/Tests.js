module.exports = (sequelize, DataTypes) => {
    const Tests = sequelize.define('Tests', {
        name: DataTypes.STRING,
        totalPoints: DataTypes.INTEGER,
        scored: DataTypes.INTEGER,
        grade: DataTypes.STRING,
        date: DataTypes.STRING
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