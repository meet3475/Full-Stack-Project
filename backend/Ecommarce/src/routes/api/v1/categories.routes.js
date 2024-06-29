const express = require("express");
const { categoriesController } = require("../../../controller");


const routes = express.Router();

//localhost:3000/api/v1/categories/list-categories
routes.get(
    '/list-categories',
    categoriesController.listcategories
)

routes.get(
    '/get-categories/:category_id', 
    categoriesController.getcategory
)

routes.get(
    '/count-active',
    categoriesController.countActive
)

routes.get(
    '/most-products',
    categoriesController.mostProducts
)

routes.post(
    '/add-categories', 
    categoriesController.addcategory
)

routes.put(
    '/update-category/:category_id', 
    categoriesController.updatecategory
)

routes.delete(
    '/delete-category/:category_id', 
    categoriesController.deletecategory
)


module.exports = routes;