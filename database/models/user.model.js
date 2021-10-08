module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define('User', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true,
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        date_birthday: {
            allowNull: true,
            type: DataTypes.DATE,
        },
        token_auth: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        situation: {
            allowNull: true,
            type: DataTypes.INTEGER,
        },
        imgProfile: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        token_notif: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        last_access: {
            allowNull: true,
            type: DataTypes.DATE
        },
        excluded: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
    }, {
        freezeTableName: true,
        timestamps: true,
        modelName: 'User'
    });


    User.associate = function (models) {
        User.hasMany(models.Thread, { as: 'thread' })
        User.hasMany(models.ThreadLike, { as: 'threadId' })
        
        User.hasMany(models.Replies, {  foreignKey: 'user' })

        User.hasOne(models.ProducerUser, {
            foreignKey: 'id'
        })

        User.hasMany(models.Rating, {
            foreignKey: 'user'
        })

        // User.belongsTo(models.UserProvider, {
        //     foreignKey: 'ID',
        //     // as:'provider',
        //     onDelete: 'CASCADE'
        // })
    };

    return User;
};
