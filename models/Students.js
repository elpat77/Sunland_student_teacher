module.exports = (sequelize, DataTypes) => {
    const Students = sequelize.define('Students', {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        picture: {
            type: DataTypes.BLOB('long'),
            allowNull: true
        },
        password: DataTypes.STRING,
    });

    Students.associate = models => {
        Students.belongsTo(models.Classes, {
            onDelete: 'cascade'
        });
    }

    return Students;
}