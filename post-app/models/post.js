const { DataTypes } = require("sequelize");
const sequelize = require("../data/db");


const Post = sequelize.define("post", {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Post;