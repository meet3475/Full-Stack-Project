const express = require("express");

const routes = express.Router();

const categoriesRoute = require("./categories.routes");
const subcategoriesRoute = require("./subcategories.routes");
const productsRoute = require("./products.routes");

//localhost:3000/api/v1/categories
routes.use("/categories", categoriesRoute);
//localhost:3000/api/v1/subcategories
routes.use("/subcategories", subcategoriesRoute);
//localhost:3000/api/v1/products
routes.use("/products", productsRoute);

module.exports = routes;