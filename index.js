const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");

const app = express();
const port = 3000;

const sequelize = new Sequelize("shop", "usershop2", "passwordshop", {
  host: "localhost",
  dialect: "mysql",
});

// todo: Перенести в окремі файли моделі та налаштування бази даних
const Products = sequelize.define("Products", {
  // Model attributes are defined here
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Description: {
    type: DataTypes.STRING,
    // allowNull defaults to true
  },
  Price: {
    type: DataTypes.FLOAT,
    // allowNull defaults to true
  },
});

const Orders = sequelize.define("Orders", {
  // Model attributes are defined here
  FName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  LName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const OrderProducts = sequelize.define("OrderProducts", {
  Price: {
    type: DataTypes.FLOAT,
    // allowNull defaults to true
  },
});

Orders.hasMany(OrderProducts);
OrderProducts.belongsTo(Orders);

Products.hasOne(OrderProducts);
OrderProducts.belongsTo(Products);

sequelize.sync({ force: true });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
