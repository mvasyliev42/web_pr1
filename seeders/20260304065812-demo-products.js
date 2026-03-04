"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    return queryInterface.bulkInsert("Products", [
      {
        Name: "Smartphone",
        Description:
          "A high-end smartphone with a powerful processor and excellent camera.",
        Price: 799.99,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Name: "Laptop",
        Description:
          "A lightweight laptop with a long battery life, perfect for work and travel.",
        Price: 1199.99,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Name: "Wireless Headphones",
        Description:
          "Noise-cancelling wireless headphones with superior sound quality.",
        Price: 199.99,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Name: "Smartwatch",
        Description:
          "A stylish smartwatch with fitness tracking and notification features.",
        Price: 249.99,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Name: "Tablet",
        Description:
          "A versatile tablet with a large display, ideal for entertainment and productivity.",
        Price: 499.99,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Name: "Gaming Console",
        Description:
          "A next-generation gaming console with stunning graphics and fast load times.",
        Price: 499.99,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Name: "Bluetooth Speaker",
        Description:
          "A portable Bluetooth speaker with deep bass and long battery life.",
        Price: 99.99,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Name: "External Hard Drive",
        Description:
          "A 2TB external hard drive for reliable data storage and backup.",
        Price: 89.99,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Name: "4K Monitor",
        Description:
          "A 27-inch 4K monitor with vibrant colors and sharp details.",
        Price: 349.99,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Name: "Mechanical Keyboard",
        Description:
          "A durable mechanical keyboard with customizable RGB lighting.",
        Price: 129.99,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Products", null, {});
  },
};
