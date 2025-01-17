const Subcategories = require("../model/subcategories.model");

const listsubcategories = async (req, res) => {
    try {
        const subcategories = await Subcategories.find();

        if (!subcategories || subcategories.length === 0) {
            res.status(404).json({
                success: false,
                message: "Subcategories not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Subcategories fetched sucessfully",
            data: subcategories
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Intenal server error." + error.message
        })
    }
}

const getcategorybysubcategory = async (req, res) => {
    try {
        console.log(req.params.category_id);

        const subcategories = await Subcategories.find({category_id: req.params.category_id});
        console.log(subcategories);

        if (!subcategories || subcategories.length === 0) {
            res.status(404).json({
                success: false,
                message: "Subcategories not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Subcategories fetched sucessfully",
            data: subcategories
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Intenal server error." + error.message
        })
    }
}


const getsubcategory = async (req, res) => {
    try {
        console.log(req.params.subcategories_id);

        const subcategory = await Subcategories.findById(req.params.subcategories_id);
        console.log(subcategory);

        if (!subcategory) {
            res.status(404).json({
                success: false,
                message: "Subcategory not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Subcategory fetched sucessfully",
            data: subcategory
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Intenal server error." + error.message
        })
    }
}

const addsubcategory = async (req, res) => {
    try {
        console.log(req.body);

        const subcategory = await Subcategories.create(req.body);
        console.log(subcategory);

        if (!subcategory) {
            res.status(400).json({
                success: false,
                message: "Subcategory not creted"
            })
        }

        res.status(201).json({
            success: true,
            message: "Subcategory careted sucessfully",
            data: subcategory
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Intenal server error." + error.message
        })
    }
}

const deletesubcategory = async (req, res) => {
    try {
        console.log(req.params.subcategories_id);

        const subcategory = await Subcategories.findByIdAndDelete(req.params.subcategories_id);
        console.log(subcategory);

        if (!subcategory) {
            res.status(404).json({
                success: false,
                message: "Subcategory not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Subcategory Deleted sucessfully",
            data: subcategory
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Intenal server error." + error.message
        })
    }
}

const updatesubcategory = async (req, res) => {
    try {
        console.log("acbd", req.params.subcategories_id, req.body);

        const subcategory = await Subcategories.findByIdAndUpdate(req.params.subcategories_id, req.body, { new: true, runValidators: true });
        console.log(subcategory);

        if (!subcategory) {
            res.status(400).json({
                success: false,
                message: "Subcategory not Update"
            })
        }

        res.status(200).json({
            success: true,
            message: "Subcategory Update sucessfully",
            data: subcategory
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Intenal server error." + error.message
        })
    }
}

module.exports = {
    listsubcategories,
    getcategorybysubcategory,
    getsubcategory,
    addsubcategory,
    deletesubcategory,
    updatesubcategory
}