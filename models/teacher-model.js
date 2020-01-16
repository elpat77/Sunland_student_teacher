module.exports = (sequelize, DataTypes) => {
    const Teacher = sequelize.define("Teacher", {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        picture: {
            type: DataTypes.BLOB('long'),
            allowNull: true
        }
    });

    Teacher.associate = models => {
        Teacher.hasMany(models.Classes, {
            onDelete: 'cascade'
        });
    }

    Teacher.associate = models => {
        Teacher.hasMany(models.Announcements, {
            onDelete: 'cascade'
        });
    }

    return Teacher;
}