module.exports = (sequelize, DataTypes) => {
    const ClassInfo = sequelize.define('ClassInfo', {
        name: DataTypes.STRING
    });

    ClassInfo.associate = models => {
        ClassInfo.hasOne(models.Classes, {
            onDelete: 'cascade'
        });

        ClassInfo.belongsTo(models.Students, {
            foreignKey: {
                allowNull: false
            }
        });
    }

    return ClassInfo;
}