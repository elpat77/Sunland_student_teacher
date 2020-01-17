module.exports = (sequelize, DataTypes) => {
    const ClassInfo = sequelize.define('ClassInfo', {
        name: DataTypes.STRING,
        section: DataTypes.STRING,
        teacher: DataTypes.STRING
    });

    ClassInfo.associates = models => {
        ClassInfo.belongsTo(models.Students, {
            foreignKey: {
                allowNull: false
            }
        });
    }

    return ClassInfo;
}