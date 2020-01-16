module.exports = (sequelize, DataTypes) => {
    const Teacher = sequelize.define("Teacher", {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        picture: {
            type: DataTypes.BLOB('long'),
            allowNull: true
        }
    });

    Teacher.associate = model => {
        Teacher.hasMany(model.Classes, {
            onDelete: 'cascade'
        });
    }

    Teacher.associate = model => {
        Teacher.hasMany(model.Assignments, {
            onDelete: 'cascade'
        });
    }

    return Teacher;
}