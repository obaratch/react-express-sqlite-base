const express = require("express");
const router = express.Router();
const logger = require("../utils/logger");

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "sqlite/db.sqlite",
});

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {}
);

(async function init() {
  await sequelize.sync();

  const admin = (
    await User.findOrCreate({
      where: { name: "admin" },
      defaults: { name: "admin" },
    })
  )[0].toJSON();
  logger.debug({ admin });
})();

router.get("/", async (req, res) => {
  const users = (await User.findAll()).map((user) => user.toJSON());
  res.send(users);
});

module.exports = router;
