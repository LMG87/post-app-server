const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");
const Like = require("./like.model");
const Comment = require("./comment.model");

const Post = sequelize.define(
  "Post",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(250),
      allowNull: false,
      validate: {
        notNull: { msg: "title is required" },
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: { msg: "title is required" },
      },
    },
    image: {
      type: DataTypes.STRING(150),
      defaultValue: "post-image.png",
    },
    author_id: {
      type: DataTypes.UUID,
    },
  },
  {
    timestamps: true,
  }
);

Post.hasMany(Like, {
  foreignKey: "post_id",
  sourceKey: "id",
  as: "Likes"
});

Like.belongsTo(Post, {
  foreignKey: "post_id",
  targetKey: "id",
  as: "Post"
});

Post.hasMany(Comment, {
  foreignKey: "post_id",
  sourceKey: "id",
  as: "Comments"
});

Comment.belongsTo(Post, {
  foreignKey: "post_id",
  targetKey: "id",
  as: "Post"
});

module.exports = Post;
