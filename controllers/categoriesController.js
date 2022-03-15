const productsModel = require("../schema/categoriesSchema")
module.exports={
    getAll:async function(req, res, next) {
      try{
        const productos = await productsModel.find()
        res.json(productos)
      }catch(e){
        next(e)
      }
    }, 
    create:async function(req, res, next) {
        try{
          console.log(req.body)
          console.log(req.body.name)

          const document = new productsModel({
            name:req.body.name
          })
          const response = await document.save()
          res.json(response)
        }catch(e){
          //e.status=200
          next(e)
        }
        
    },
    elementDelete: async function(req,res,next){
      try{
          const deleteOne = await products.deleteOne({_id:req.params.id})
          res.json(deleteOne)
      }catch(err){
          console.log(err);
      }
    }
}