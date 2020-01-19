module.exports = (sequelize, DataTypes) => {
    const moment = require('moment');
    const Assignments = sequelize.define('Assignments', {
        title: DataTypes.STRING,
        dueDate: {
            type: DataTypes.DATEONLY,
            get: function () {
                return moment.utc(this.getDataValue('CreateDate')).format('YYYY-MM-DD');
            }
        },
        timeDue: {
            type: DataTypes.TIME,
            // get: function () {
            //     let time = this.getDataValue('CreateTime');
            //     if (moment(time, moment.ISO_8601, true).isValid()) {
            //         return moment(this.getDataValue('CreateTime')).format('HH:mm:ss');
            //     } else {
            //         return time;
            //     }
            // }
        },
        description: DataTypes.TEXT,
        turnedIn: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
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