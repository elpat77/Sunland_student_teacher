module.exports = (sequelize, DataTypes) => {
    const moment = require('moment');
    const Assignments = sequelize.define('Assignments', {
        title: DataTypes.STRING,
        dueDate: DataTypes.STRING,
        timeDue: DataTypes.STRING,
        description: DataTypes.TEXT,
        turnedIn: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        totalPoints: DataTypes.INTEGER,
        scored: DataTypes.INTEGER,
        grade: DataTypes.STRING
    });

    Assignments.associate = models => {
        Assignments.belongsTo(models.Grades, {
            foreignKey: {
                allowNull: false
            }
        });
    }

    return Assignments;
}