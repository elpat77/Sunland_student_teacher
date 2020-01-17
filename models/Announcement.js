module.exports = (sequelize, DataTypes) => {
    const Announcements = sequelize.define('Announcements', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        body: {
            type: DataTypes.TEXT
        }
    });

    Announcements.associate = models => {
        Announcements.belongsTo(models.Classes, {
            onDelete: 'cascade'
        });
    }

    return Announcements;
}