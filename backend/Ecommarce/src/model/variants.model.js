const mongoose = require("mongoose");

//sub Schema 

const attributesSchema = new mongoose.Schema (
    {
        name: {
            type: String,
            required: true,
            unique: true
        }, 
        value: {
            type: String,
            required: true
        },
        stock: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }, 
    {
        timestamps: true,
        versionKey: false
    }
)

const variantsSchema = new mongoose.Schema (
    {
        product_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Products',
            required: true
        },
        attributs: [attributesSchema],
        isActive: {
            type: Boolean,
            default: true
        }
    }, 
    {
        timestamps: true,
        versionKey: false
    }
)

const Variants = mongoose.model("Variants", variantsSchema);
module.exports = Variants;
 