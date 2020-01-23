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

        Students.hasMany(models.ClassInfo, {
            onDelete: 'cascade'
        });

        Students.hasMany(models.Grades, {
            onDelete: 'cascade'
        });
    }


    return Students;
}