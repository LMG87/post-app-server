const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../db/db");
const Post = require("./post.model");
const Like = require("./like.model");
const Comment = require("./comment.model");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        notNull: { msg: "first name is required" },
      },
    },
    last_name: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        notNull: { msg: "last name is required" },
      },
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notNull: { msg: "email is required" },
      },
    },
    telephone: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        notNull: { msg: "telephone is required" },
      },
    },
    avatar: {
      type: DataTypes.STRING(150),
      defaultValue: "avatar-user.png",
    },
    role_id: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notNull: { msg: "role is required" },
      },
    },
  },
  {
    timestamps: true,
  }
);

User.hasMany(Post, {
  foreignKey: "author_id",
  sourceKey: "id",
  as: "Posts"
});

Post.belongsTo(User, {
  foreignKey: "author_id",
  targetKey: "id",
  as: "Author"
});

User.hasMany(Like, {
  foreignKey: "user_id",
  sourceKey: "id",
  as: "Likes"
});

Like.belongsTo(User, {
  foreignKey: "user_id",
  targetKey: "id",
  as: "Author"
});

User.hasMany(Comment, {
  foreignKey: "user_id",
  sourceKey: "id",
  as: "Comments"
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
  targetKey: "id",
  as: "Author"
});

module.exports = User;
