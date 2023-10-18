const mongoose = require("../config/mongoDb");

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    }
});

module.exports = mongoose.model("categories", categorySchema)