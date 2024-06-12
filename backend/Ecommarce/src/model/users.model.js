const mongooes = require("mongoose");

const usersSchema = new mongooes.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },
        address: {
            type: String,
            trim: true,
            required: true
        },
        phone: {
            type: Number,
            trim: true,
            required: true
        },
        email: {
            type: String,
            trim: true,
            required: true
        }, 
        password: {
            type: String,
            trim: true,
            required: true
        },
        role: {
            type: String,
            trim: true,
            required: true
        },
        refresh_tocken: {
            type: String,
            trim: true,
            required: true
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const Users = mongooes.model("Users", usersSchema);
module.exports = Users;