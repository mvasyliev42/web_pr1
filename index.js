import express from "express";
import { Sequelize, DataTypes } from "sequelize";

// const express = require("express");
// const { Sequelize, DataTypes } = require("sequelize");

/*const sequelize = new Sequelize("shop", "usershop2", "passwordshop", {
  host: "localhost",
  dialect: "mysql",
});
*/

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite",
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

//todo: Додати статус замовлення

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

await sequelize.sync();

const app = express();
const port = 3000;
app.use(express.json());

app.get("/Products", async (req, res) => {
  const products = await Products.findAll();
  res.json(products);
});

app.post("/Order", async (req, res) => {
  //todo: Додати збереження пов'язаного поля OrderProducts
  // https://sequelize.org/docs/v6/advanced-association-concepts/creating-with-associations/#hasmany--belongstomany-association
  const order = await Orders.create({
    FName: req.body.FName,
    LName: req.body.LName,
    Phone: req.body.Phone,
  });
  console.log(req.body);
  res.json(order);
});

// Додати REST endpoint для отримання інформації по замовленню

app.get("/", (req, res) => {
  res.send("Hi World!!!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
