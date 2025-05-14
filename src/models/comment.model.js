const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db');

const Comment = sequelize.define(
    'Comment',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        post_id: {
            type: DataTypes.UUID,
        },
        user_id: {
            type: DataTypes.UUID,
        }
    },
    {
        timestamps: true
    }
);


module.exports = Comment;
