module.exports = (sequelize, DataTypes) => {
    const Classes = sequelize.define('Classes', {
        subject: DataTypes.STRING,
        section: DataTypes.STRING,
        teacher: DataTypes.STRING
    });

    Classes.associate = models => {
        Classes.belongsTo(models.Teacher, {
            foreignKey: 'teacher_id',
            targetKey: 'teacher_id',
            as: 'Teacher'
        });
        Classes.belongsTo(models.Students, {
            foreignKey: 'student_id',
            targetKey: 'student_id',
            as: 'Students'
        });
    }

    Classes.associate = models => {
        Classes.hasMany(models.Students, {
            onDelete: 'cascade'
        });
    }

    Classes.associate = models => {
        Classes.hasMany(models.Announcements, {
            onDelete: 'cascade'
        });
    }

    Classes.associate = models => {
        Classes.hasMany(models.Assignments, {
            onDelete: 'cascade'
        });
    }

    return Classes;
}