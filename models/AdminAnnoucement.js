module.exports = (sequelize, DataTypes) => {
    const AdminAnnouncements = sequelize.define('AdminAnnouncements', {
        title: DataTypes.STRING,
        body: DataTypes.TEXT
    });

    return AdminAnnouncements;
}