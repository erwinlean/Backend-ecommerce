var mongoose = require('mongoose'); 
mongoose.connect("mongodb://0.0.0.0:27017/").then(() => {
console.log("conectado a la base de datos mongodb: 0.0.0.0:27017");
}).catch((err) => {
    console.log("No Conectado, error en base de datos", err);
});
module.exports = mongoose; 
//ver ip de coneccion