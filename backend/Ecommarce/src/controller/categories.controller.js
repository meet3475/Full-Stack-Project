const Categories = require("../model/categories.model")

const listcategories = async (req, res) => {
    try {
        const categories = await Categories.find();

        if (!categories || categories.length === 0) {
            res.status(404).json({
                success: false,
                message: "Categories not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "categories fetched sucessfully",
            data: categories
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Intenal server error." + error.message
        })
    }
}

const getcategory = async (req, res) => {
    try {
        console.log(req.params.category_id);

        const category = await Categories.findById(req.params.category_id);
        console.log(category);

        if (!category) {
            res.status(404).json({
                success: false,
                message: "Category not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Category fetched sucessfully",
            data: category
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Intenal server error." + error.message
        })
    }
}

const addcategory = async (req, res) => {
    try {
        console.log(req.body);

        const category = await Categories.create(req.body);
        console.log(category);

        if (!category) {
            res.status(400).json({
                success: false,
                message: "Category not creted"
            })
        }

        res.status(201).json({
            success: true,
            message: "Category careted sucessfully",
            data: category
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Intenal server error." + error.message
        })
    }
}

const deletecategory = async (req, res) => {
    try {
        console.log(req.params.category_id);

        const category = await Categories.findByIdAndDelete(req.params.category_id);
        console.log(category);

        if (!category) {
            res.status(404).json({
                success: false,
                message: "Category not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Category Deleted sucessfully",
            data: category
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Intenal server error." + error.message
        })
    }
}

const updatecategory = async (req, res) => {
    try {
        console.log("acbd", req.params.category_id, req.body);
        
        const category = await Categories.findByIdAndUpdate(req.params.category_id, req.body, {new:true, runValidators:true});
        console.log(category);

        if (!category) {
            res.status(400).json({
                success: false,
                message: "Category not Update"
            })
        }

        res.status(200).json({
            success: true,
            message: "Category Update sucessfully",
            data: category
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Intenal server error." + error.message
        })
    }
}

module.exports = {
    listcategories,
    getcategory,
    addcategory,
    deletecategory,
    updatecategory
}