module.exports = (sequelize, DataTypes) => {
    const StudentClasses = sequelize.define('StudentClasses', {
        studentId: DataTypes.INTEGER,
        studentName: DataTypes.STRING,
        email: DataTypes.STRING
    });
    StudentClasses.associate = models => {
        StudentClasses.belongsTo(models.Classes, {
            foreignKey: {
                allowNull: false
            }
        });
    }

    return StudentClasses;
}