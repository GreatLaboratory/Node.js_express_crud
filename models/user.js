module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        // sequelize에선 알아서 id를 기본 pk키로 연결하므로 따로 id컬럼 적어줄 필요없음.
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
        },
        age: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        married: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('now()'),
        },
    }, {
        timestamps: false,
    });
};