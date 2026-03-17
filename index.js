import express from "express";
import { Sequelize, DataTypes } from "sequelize";
// import { Database } from "sqlite3";

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
  Status: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

const OrderProducts = sequelize.define("OrderProducts", {
  Price: {
    type: DataTypes.FLOAT,
  },
  Count: {
    type: DataTypes.INTEGER,
  },
});

Orders.hasMany(OrderProducts);
OrderProducts.belongsTo(Orders);

Products.hasOne(OrderProducts);
OrderProducts.belongsTo(Products);

await sequelize.sync({ force: true });

const app = express();
const port = 3000;
app.use(express.json());

app.get("/Products", async (req, res) => {
  const products = await Products.findAll();
  res.json(products);
});

app.post("/Order", async (req, res) => {
  //
  // https://sequelize.org/docs/v6/advanced-association-concepts/creating-with-associations/#hasmany--belongstomany-association
  const Info = await Promise.all(
    req.body.OrderProducts.map(async function (OneProduct) {
      const product = await Products.findOne({
        where: {
          id: OneProduct.ProductId,
        },
      });
      OneProduct.Price = product.Price;
      return OneProduct;
    }),
  );
  const order = await Orders.create(
    {
      FName: req.body.FName,
      LName: req.body.LName,
      Phone: req.body.Phone,
      OrderProducts: Info,
      Status: 10,
    },
    {
      include: [OrderProducts],
    },
  );
  console.log(req.body);
  res.json(order);
});

// Додати REST endpoint для отримання інформації по замовленню

app.get("/", (req, res) => {
  res.send("Hi World!!!");
});

app.get("/newpage", (req, res) => {
  res.send("New page");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
