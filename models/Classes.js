module.exports = (sequelize, DataTypes) => {
    const Classes = sequelize.define('Classes', {
        subject: DataTypes.STRING,
        section: DataTypes.STRING,
        teacher: DataTypes.STRING
    });

    Classes.associate = models => {
        Classes.belongsTo(models.Teacher, {
            foreignKey: 'teacherId'
        });
        // Classes.belongsTo(models.Students, {
        //     foreignKey: 'studentId'
        // });
    }

    Classes.associate = models => {
        Classes.hasMany(models.Announcements, {
            onDelete: 'cascade'
        });

        Classes.hasMany(models.Assignments, {
            onDelete: 'cascade'
        });

        Classes.hasMany(models.Students, {
            onDelete: 'cascade'
        });
    }


    return Classes;
}