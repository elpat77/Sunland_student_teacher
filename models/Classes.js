module.exports = (sequelize, DataTypes) => {
    const Classes = sequelize.define('Classes', {
        subject: DataTypes.STRING,
        section: DataTypes.STRING,
        teacher: DataTypes.STRING
    });

    Classes.associate = models => {
        Classes.belongsTo(models.Teacher, {
            foreignKey: {
                allowNull: false
            }
        });

        Classes.hasMany(models.Announcements, {
            onDelete: 'cascade'
        });

        Classes.hasMany(models.Students, {
            onDelete: 'cascade'
        });

        Classes.hasMany(models.Assignments, {
            onDelete: 'cascade'
        });
    }


    return Classes;
}