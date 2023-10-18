const mongoose = require("mongoose");
const Category = require("./categoriesSchema");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        minlength: 1,
    },
    sku: {
        type: String,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
        min: 1,
    },
    description: {
        type: String,
        lowercase: true,
        required: true,
        minlength: 10,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Category,
    },
    deleted: {
        type: Boolean,
        default: false,
    }
});

module.exports = mongoose.model("products", productSchema);