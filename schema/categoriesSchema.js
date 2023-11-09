<<<<<<< HEAD
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
    }
});

=======
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
    }
});

>>>>>>> f89ca1459a0986a835c57ae79333a48ae82ec41e
module.exports = mongoose.model("categories", categorySchema);