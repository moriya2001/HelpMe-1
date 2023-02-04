const mongoose=require("mongoose")
let societySchema= new mongoose.Schema({
    Name:String
})
const model=mongoose.model("society",societySchema)
module.exports=model
////////הראם זה MODULE או MODEL
