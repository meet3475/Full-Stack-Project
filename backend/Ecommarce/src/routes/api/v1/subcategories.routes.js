const express = require("express");
const { subcategoriesController } = require("../../../controller");

const routes = express.Router();

//localhost:3000/api/v1/subcategories/list-subcategories
routes.get(
    '/list-subcategories', 
    subcategoriesController.listsubcategories
)

routes.get(
    '/bycategory-list-subcategories/:category_id', 
    subcategoriesController.getcategorybysubcategory
)

routes.get(
    '/get-subcategories/:subcategories_id', 
    subcategoriesController.getsubcategory
)

routes.post(
    '/add-subcategories', 
    subcategoriesController.addsubcategory
)

routes.put(
    '/update-subcategory/:subcategories_id',
    subcategoriesController.updatesubcategory 
   
)

routes.delete(
    '/delete-subcategory/:subcategories_id', 
    subcategoriesController.deletesubcategory
)


module.exports = routes;