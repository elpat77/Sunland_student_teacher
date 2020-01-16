module.exports = (sequelize, DataTypes) => {
    const Classes = sequelize.define('Classes', {
        name: DataTypes.STRING
    });

    Classes.associate = models => {
        Classes.belongsTo(models.Teacher, {
            foreignKey: {
                allowNull: false
            }
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

    return Classes;
}